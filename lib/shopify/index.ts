import {
  ADD_ON_PRODUCT_TYPES,
  AVAILABILITY_FILTER_ID,
  HIDDEN_PRODUCT_TAG,
  MAKE_FILTER_ID,
  MODEL_FILTER_ID,
  PRICE_FILTER_ID,
  PRODUCT_METAFIELD_PREFIX,
  SHOPIFY_GRAPHQL_ADMIN_ADMIN_API_ENDPOINT,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  SHOPIFY_GRAPHQL_CUSTOMER_API_ENDPOINT,
  TAGS,
  VARIANT_METAFIELD_PREFIX,
  YEAR_FILTER_ID
} from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith, normalizeUrl, parseJSON, parseMetaFieldValue } from 'lib/utils';
import { revalidatePath, revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation,
  setCartAttributesMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
import { getCustomerQuery } from './queries/customer';
import { getMenuQuery } from './queries/menu';
import { getMetaobjectQuery, getMetaobjectsQuery } from './queries/metaobject';
import { getImageQuery, getMetaobjectsByIdsQuery } from './queries/node';
import { getCustomerOrderQuery } from './queries/order';
import { getCustomerOrdersQuery } from './queries/orders';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Address,
  Cart,
  CartAttributeInput,
  Collection,
  Connection,
  Customer,
  Filter,
  Fulfillment,
  Image,
  LineItem,
  Menu,
  Metaobject,
  Money,
  Order,
  Page,
  PageInfo,
  Product,
  ProductVariant,
  ShopifyAddToCartOperation,
  ShopifyAddress,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyCustomer,
  ShopifyCustomerOperation,
  ShopifyCustomerOrderOperation,
  ShopifyCustomerOrdersOperation,
  ShopifyFilter,
  ShopifyImageOperation,
  ShopifyMenuOperation,
  ShopifyMetaobject,
  ShopifyMetaobjectsOperation,
  ShopifyMoneyV2,
  ShopifyOrder,
  ShopifyPage,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductVariant,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifySetCartAttributesOperation,
  ShopifyUpdateCartOperation,
  Transaction,
  TransmissionType
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';

const customerApiUrl = process.env.SHOPIFY_CUSTOMER_ACCOUNT_API_URL;

const storefrontEndpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const customerEndpoint = `${customerApiUrl}/${SHOPIFY_GRAPHQL_CUSTOMER_API_ENDPOINT}`;
const adminEndpoint = `${domain}${SHOPIFY_GRAPHQL_ADMIN_ADMIN_API_ENDPOINT}`;

const userAgent = '*';
const placeholderProductImage =
  'https://cdn.shopify.com/shopifycloud/customer-account-web/production/assets/8bc6556601c510713d76.svg';

const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;
const adminAccessToken = process.env.SHOPIFY_ADMIN_API_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

export async function shopifyFetch<T>({
  cache = 'force-cache',
  headers,
  query,
  tags,
  variables
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query: string;
  tags?: string[];
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(storefrontEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': key,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      ...(tags && { next: { tags } })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

async function adminFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  try {
    const result = await fetch(adminEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken,
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      })
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

export async function shopifyCustomerFetch<T>({
  query,
  variables
}: {
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  const headersList = headers();
  const customerToken = headersList.get('x-shop-customer-token') || '';

  try {
    const result = await fetch(customerEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': userAgent,
        Origin: domain,
        Authorization: customerToken
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache: 'no-store'
    });

    const body = await result.json();
    if (!result.ok) {
      //the statuses here could be different, a 401 means
      //https://shopify.dev/docs/api/customer#endpoints
      //401 means the token is bad
      console.log('Error in Customer Fetch Status', body.errors);
      if (result.status === 401) {
        // clear session because current access token is invalid
        const errorMessage = 'unauthorized';
        throw errorMessage; //this should throw in the catch below in the non-shopify catch
      }
      let errors;
      try {
        errors = parseJSON(body);
      } catch (_e) {
        errors = [{ message: body }];
      }
      throw errors;
    }

    //this just throws an error and the error boundary is called
    if (body.errors) {
      //throw 'Error'
      console.log('Error in Customer Fetch', body.errors[0]);
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isShopifyError(e)) {
      throw {
        cause: e.cause?.toString() || 'unknown',
        status: e.status || 500,
        message: e.message,
        query
      };
    }

    throw {
      error: e,
      query
    };
  }
}

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines).map((lineItem) => ({
      ...lineItem,
      merchandise: {
        ...lineItem.merchandise,
        product: lineItem.merchandise.product
      }
    }))
  };
};

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
    helpfulLinks: parseMetaFieldValue<string[]>(collection.helpfulLinks),
    helpfulLinksTop: parseMetaFieldValue<string[]>(collection.helpfulLinksTop),
    path: `/search/${collection.handle}`
  };
};

const reshapeCollections = (collections: ShopifyCollection[]) => {
  const reshapedCollections = [];

  for (const collection of collections) {
    if (collection) {
      const reshapedCollection = reshapeCollection(collection);

      if (reshapedCollection) {
        reshapedCollections.push(reshapedCollection);
      }
    }
  }

  return reshapedCollections;
};

const reshapeFilters = (filters: ShopifyFilter[]): Filter[] => {
  const reshapedFilters = [];
  const excludedYMMFilters = filters.filter(
    (filter) => ![MODEL_FILTER_ID, MAKE_FILTER_ID, YEAR_FILTER_ID].includes(filter.id)
  );
  for (const filter of excludedYMMFilters) {
    const values = filter.values
      .map((valueItem) => {
        if (filter.id === AVAILABILITY_FILTER_ID) {
          return {
            ...valueItem,
            value: JSON.parse(valueItem.input).available
          };
        }

        if (filter.id === PRICE_FILTER_ID) {
          return {
            ...valueItem,
            value: JSON.parse(valueItem.input)
          };
        }

        if (filter.id.startsWith(PRODUCT_METAFIELD_PREFIX)) {
          return {
            ...valueItem,
            value: JSON.parse(valueItem.input).productMetafield.value
          };
        }

        if (filter.id.startsWith(VARIANT_METAFIELD_PREFIX)) {
          return {
            ...valueItem,
            value: JSON.parse(valueItem.input).variantMetafield.value
          };
        }

        return null;
      })
      .filter(Boolean) as Filter['values'];

    reshapedFilters.push({ ...filter, values });
  }

  return reshapedFilters;
};

const reshapeMetaobjects = (metaobjects: ShopifyMetaobject[]): Metaobject[] => {
  return metaobjects.map(({ fields, id, type }) => {
    const groupedFieldsByKey = fields.reduce(
      (acc, field) => {
        return {
          ...acc,
          [field.key]: field.value
        };
      },
      {} as {
        [key: string]:
          | {
              value: string;
              referenceId: string;
            }
          | string;
      }
    );

    return { id, type, ...groupedFieldsByKey };
  });
};

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeVariants = (variants: ShopifyProductVariant[]): ProductVariant[] => {
  return variants.map(({ addOnProductId, addOnQuantity, ...variant }) => ({
    ...variant,
    waiverAvailable: parseMetaFieldValue<boolean>(variant.waiverAvailable),
    coreVariantId: variant.coreVariantId?.value || null,
    coreCharge: parseMetaFieldValue<Money>(variant.coreCharge),
    mileage: variant.mileage?.value ?? null,
    estimatedDelivery: variant.estimatedDelivery?.value || null,
    condition: variant.condition?.value || null,
    ...(addOnProductId
      ? {
          addOnProduct: {
            id: addOnProductId.value,
            quantity: addOnQuantity?.value ? Number(addOnQuantity.value) : 1
          }
        }
      : {})
  }));
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
): Product | undefined => {
  if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
    return undefined;
  }

  const { images, variants, ...rest } = product;
  return {
    ...rest,
    transmissionCode: parseMetaFieldValue<string[]>(product.transmissionCode),
    transmissionSpeeds: parseMetaFieldValue<number[]>(product.transmissionSpeeds),
    transmissionTag: parseMetaFieldValue<string[]>(product.transmissionTag),
    driveType: parseMetaFieldValue<string[]>(product.driveType),
    transmissionType: product.transmissionType
      ? (product.transmissionType.value as TransmissionType)
      : null,
    engineCylinders: parseMetaFieldValue<number[]>(product.engineCylinders),
    fuelType: product.fuelType?.value || null,
    images: reshapeImages(images, product.title),
    variants: reshapeVariants(removeEdgesAndNodes(variants))
  };
};

const reshapeProducts = (products: ShopifyProduct[]) => {
  const reshapedProducts = [];

  for (const product of products) {
    if (product) {
      const reshapedProduct = reshapeProduct(product);
      if (reshapedProduct) {
        reshapedProducts.push(reshapedProduct);
      }
    }
  }

  return reshapedProducts;
};

function reshapeCustomer(customer: ShopifyCustomer): Customer {
  return {
    firstName: customer.firstName,
    lastName: customer.lastName,
    displayName: customer.displayName,
    emailAddress: customer.emailAddress.emailAddress
  };
}

function reshapeOrders(orders: ShopifyOrder[]): any[] | Promise<Order[]> {
  const reshapedOrders: Order[] = [];

  for (const order of orders) {
    const reshapedOrder = reshapeOrder(order);
    if (!reshapedOrder) continue;

    reshapedOrders.push(reshapedOrder);
  }

  return reshapedOrders;
}

function reshapeOrder(shopifyOrder: ShopifyOrder): Order {
  const reshapeAddress = (address?: ShopifyAddress): Address | undefined => {
    if (!address) return undefined;
    return {
      address1: address.address1,
      address2: address.address2,
      firstName: address.firstName,
      lastName: address.lastName,
      provinceCode: address.provinceCode,
      city: address.city,
      zip: address.zip,
      country: address.countryCodeV2,
      company: address.company,
      phone: address.phone
    };
  };

  const reshapeMoney = (money?: ShopifyMoneyV2): Money | undefined => {
    if (!money) return undefined;
    return {
      amount: money.amount || '0.00',
      currencyCode: money.currencyCode || 'USD'
    };
  };

  const orderFulfillments: Fulfillment[] =
    shopifyOrder.fulfillments?.edges?.map((edge) => ({
      status: edge.node.status,
      createdAt: edge.node.createdAt,
      trackingInformation:
        edge.node.trackingInformation?.map((tracking) => ({
          number: tracking.number,
          company: tracking.company,
          url: tracking.url
        })) || [],
      events:
        edge.node.events?.edges.map((event) => ({
          status: event.node.status,
          happenedAt: event.node.happenedAt
        })) || [],
      fulfilledLineItems:
        edge.node.fulfillmentLineItems?.nodes.map((lineItem) => ({
          id: lineItem.lineItem.id,
          quantity: lineItem.quantity,
          image: {
            url: lineItem.lineItem.image?.url || placeholderProductImage,
            altText: lineItem.lineItem.image?.altText || lineItem.lineItem.title,
            width: 62,
            height: 62
          }
        })) || []
    })) || [];

  const orderTransactions: Transaction[] = shopifyOrder.transactions?.map((transaction) => ({
    processedAt: transaction.processedAt,
    paymentIcon: {
      url: transaction.paymentIcon.url,
      altText: transaction.paymentIcon.altText,
      width: 100,
      height: 100
    },
    paymentDetails: {
      last4: transaction.paymentDetails.last4,
      cardBrand: transaction.paymentDetails.cardBrand
    },
    transactionAmount: reshapeMoney(transaction.transactionAmount.presentmentMoney)!
  }));

  const orderLineItems: LineItem[] =
    shopifyOrder.lineItems?.nodes?.map((item) => ({
      ...item,
      price: reshapeMoney(item.price),
      totalPrice: reshapeMoney(item.totalPrice)
    })) || [];

  const order: Order = {
    id: shopifyOrder.id,
    normalizedId: shopifyOrder.id.replace('gid://shopify/Order/', ''),
    name: shopifyOrder.name,
    processedAt: shopifyOrder.processedAt,
    fulfillments: orderFulfillments,
    transactions: orderTransactions,
    lineItems: orderLineItems,
    shippingAddress: reshapeAddress(shopifyOrder.shippingAddress),
    billingAddress: reshapeAddress(shopifyOrder.billingAddress),
    subtotal: reshapeMoney(shopifyOrder.subtotal),
    totalShipping: reshapeMoney(shopifyOrder.totalShipping),
    totalTax: reshapeMoney(shopifyOrder.totalTax),
    totalPrice: reshapeMoney(shopifyOrder.totalPrice),
    createdAt: shopifyOrder.createdAt
  };

  if (shopifyOrder.customer) {
    order.customer = reshapeCustomer(shopifyOrder.customer);
  }

  if (shopifyOrder.shippingLine) {
    order.shippingMethod = {
      name: shopifyOrder.shippingLine?.title,
      price: reshapeMoney(shopifyOrder.shippingLine.originalPrice)!
    };
  }

  return order;
}

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation,
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function setCartAttributes(cartId: string, attributes: CartAttributeInput[]) {
  const res = await shopifyFetch<ShopifySetCartAttributesOperation>({
    query: setCartAttributesMutation,
    variables: {
      attributes,
      cartId
    },
    cache: 'no-store'
  });

  return res.body.data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  const res = await shopifyFetch<ShopifyCartOperation>({
    query: getCartQuery,
    variables: { cartId },
    tags: [TAGS.cart],
    cache: 'no-store'
  });

  // Old carts becomes `null` when you checkout.
  if (!res.body.data.cart) {
    return undefined;
  }

  const cart = reshapeCart(res.body.data.cart);

  // attach core charge as an additional attribute of a cart line, and remove the core charge line from cart
  const extendedCartLines = cart?.lines
    .map((item) => {
      const coreVariantId = item.merchandise.coreVariantId?.value;
      const addOnProductId = item.merchandise.addOnProductId;
      const _item = { ...item };

      if (coreVariantId) {
        const relatedCoreCharge = cart.lines.find((line) => line.merchandise.id === coreVariantId);
        _item.coreCharge = relatedCoreCharge;
      }

      if (addOnProductId) {
        const relatedAddOnProduct = cart.lines.find(
          (line) => line.merchandise.id === addOnProductId.value
        );
        _item.addOnProduct = relatedAddOnProduct
          ? {
              ...relatedAddOnProduct,
              quantity: item.merchandise.addOnQuantity
                ? Number(item.merchandise.addOnQuantity.value)
                : 1
            }
          : undefined;
      }
      return _item;
    })
    // core charge shouldn't present as a dedicated product as it's tightly coupled with the product
    .filter((item) => item.merchandise.product.productType !== ADD_ON_PRODUCT_TYPES.coreCharge);

  const totalQuantity = extendedCartLines.reduce((sum, line) => sum + line.quantity, 0);

  return { ...cart, totalQuantity, lines: extendedCartLines };
}

export async function getCollection({
  handle,
  id
}: {
  handle?: string;
  id?: string;
}): Promise<Collection | undefined> {
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle,
      id
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  filters,
  after
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
  filters?: Array<object>;
  after?: string;
}): Promise<{ products: Product[]; filters: Filter[]; pageInfo: PageInfo }> {
  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey,
      filters,
      after
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return {
      products: [],
      filters: [],
      pageInfo: { startCursor: '', hasNextPage: false, endCursor: '' }
    };
  }

  const pageInfo = res.body.data.collection.products.pageInfo;
  return {
    products: reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products)),
    filters: reshapeFilters(res.body.data.collection.products.filters),
    pageInfo
  };
}

export async function getCollections(): Promise<Collection[]> {
  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery,
    tags: [TAGS.collections]
  });
  const shopifyCollections = removeEdgesAndNodes(res.body?.data?.collections);
  const collections = [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString(),
      helpfulLinks: null,
      helpfulLinksTop: null
    },
    // Filter out the `hidden` collections.
    // Collections that start with `hidden-*` need to be hidden on the search page.
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  const res = await shopifyFetch<ShopifyMenuOperation>({
    query: getMenuQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  const formatMenuItems = (
    menu: { title: string; url: string; items?: { title: string; url: string }[] }[] = []
  ): Menu[] =>
    menu.map((item) => ({
      title: item.title,
      path: normalizeUrl(domain, item.url),
      items: item.items?.length ? formatMenuItems(item.items) : []
    }));

  return formatMenuItems(res.body?.data?.menu?.items);
}

export async function getMetaobjects(type: string) {
  const res = await shopifyFetch<ShopifyMetaobjectsOperation>({
    query: getMetaobjectsQuery,
    tags: [TAGS.collections, TAGS.products],
    variables: { type }
  });

  return reshapeMetaobjects(removeEdgesAndNodes(res.body.data.metaobjects));
}

export async function getMetaobjectsByIds(ids: string[]) {
  if (!ids.length) return [];

  const res = await shopifyFetch<{
    data: { nodes: ShopifyMetaobject[] };
    variables: { ids: string[] };
  }>({
    query: getMetaobjectsByIdsQuery,
    variables: { ids }
  });

  return reshapeMetaobjects(res.body.data.nodes);
}

export async function getMetaobject({
  id,
  handle
}: {
  id?: string;
  handle?: { handle: string; type: string };
}) {
  const res = await shopifyFetch<{
    data: { metaobject: ShopifyMetaobject };
    variables: { id?: string; handle?: { handle: string; type: string } };
  }>({
    query: getMetaobjectQuery,
    variables: { id, handle }
  });

  return res.body.data.metaobject ? reshapeMetaobjects([res.body.data.metaobject])[0] : null;
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle, key: 'page_content', namespace: 'custom' },
    tags: [TAGS.pages]
  });

  const page = res.body.data.pageByHandle;

  if (page?.metafield) {
    const metaobjectIds = parseMetaFieldValue<string[]>(page.metafield) || [];

    const metaobjects = await getMetaobjectsByIds(metaobjectIds);

    const { metafield, ...restPage } = page;
    return { ...restPage, metaobjects };
  }

  return page;
}

export async function getPages(): Promise<ShopifyPage[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    tags: [TAGS.products],
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    tags: [TAGS.products],
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey,
  after
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  after?: string;
}): Promise<{ products: Product[]; pageInfo: PageInfo }> {
  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    tags: [TAGS.products],
    variables: {
      query,
      reverse,
      sortKey,
      after
    }
  });
  const pageInfo = res.body.data.products.pageInfo;
  return {
    products: reshapeProducts(removeEdgesAndNodes(res.body.data.products)),
    pageInfo
  };
}

export async function getCustomer(): Promise<Customer> {
  const res = await shopifyCustomerFetch<ShopifyCustomerOperation>({
    query: getCustomerQuery
  });

  const customer = res.body.data.customer;
  return reshapeCustomer(customer);
}

export async function getCustomerOrders(): Promise<Order[]> {
  const res = await shopifyCustomerFetch<ShopifyCustomerOrdersOperation>({
    query: getCustomerOrdersQuery
  });

  return reshapeOrders(removeEdgesAndNodes(res.body.data.customer.orders));
}

export async function getCustomerOrder(orderId: string): Promise<Order> {
  const res = await shopifyCustomerFetch<ShopifyCustomerOrderOperation>({
    query: getCustomerOrderQuery,
    variables: { orderId: `gid://shopify/Order/${orderId}` }
  });

  return reshapeOrder(res.body.data.order);
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  console.log(`Receiving revalidation request from Shopify.`);
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  console.log(`Receiving revalidation request with topic.`, { topic });

  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);
  const isPageUpdate = topic.startsWith(TAGS.pages);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate && !isPageUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  if (isPageUpdate) {
    const pageHandle = topic.split(':')[1];
    pageHandle && revalidatePath(pageHandle);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}

export const getImage = async (id: string): Promise<Image> => {
  const res = await shopifyFetch<ShopifyImageOperation>({
    query: getImageQuery,
    variables: { id }
  });

  return res.body.data.node.image;
};
