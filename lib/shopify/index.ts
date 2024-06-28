import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { Where, create, find, findByID } from 'lib/shopify/payload';
import { Cart, Category, Media, Option, Product } from 'lib/shopify/payload-types';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { editCartItemsMutation, removeFromCartMutation } from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { getPageQuery } from './queries/page';
import {
  CartItem,
  Collection,
  Connection,
  Cart as ExCart,
  Product as ExProduct,
  Image,
  Menu,
  Money,
  Page,
  ProductOption,
  ProductVariant,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyPageOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

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
    const result = await fetch(endpoint, {
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

const removeEdgesAndNodes = (array: Connection<any>) => {
  return array.edges.map((edge) => edge?.node);
};

const reshapeCart = (cart: ShopifyCart): ExCart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: 'USD'
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCartItems = (cartItems: Cart['lines']): CartItem[] => {
  return (cartItems ?? []).map((item) => {
    const product = item.product as Product;
    const variant = product.variants.find((v) => v.id === item.variant);

    return {
      id: item.variant,
      quantity: item.quantity,
      merchandise: {
        id: item.variant,
        title: product.title,
        selectedOptions: [],
        product: reshapeProduct(product)
      },
      cost: {
        totalAmount: reshapePrice(variant?.price!)
      }
    };
  });
};

const reshapeC = (cart: Cart): ExCart => {
  return {
    id: cart.id,
    checkoutUrl: '/api/checkout',
    cost: {
      totalAmount: {
        currencyCode: 'EUR',
        amount: cart.totalAmount?.toString()!
      },
      totalTaxAmount: {
        currencyCode: 'EUR',
        amount: '0.0'
      },
      subtotalAmount: {
        currencyCode: 'EUR',
        amount: '0.0'
      }
    },
    lines: reshapeCartItems(cart.lines),
    totalQuantity: 0
  };
};

export async function createCart(): Promise<ExCart> {
  const cart = await create<Cart>('carts', { lines: [] });
  return reshapeC(cart);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<ExCart> {
  console.log('TEST');
  // const res = await shopifyFetch<ShopifyAddToCartOperation>({
  //   query: addToCartMutation,
  //   variables: {
  //     cartId,
  //     lines
  //   },
  //   cache: 'no-store'
  // });
  // return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<ExCart> {
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
): Promise<ExCart> {
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

export async function getCart(cartId: string): Promise<ExCart | undefined> {
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

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const category = await findByID<Category>('categories', handle);
  return reshapeCategory(category);
}

const reshapeImage = (media: Media): Image => {
  return {
    url: media.url!,
    altText: media.alt,
    width: media.width,
    height: media.height
  };
};

type Price = {
  amount: number;
  currencyCode: string;
};

const reshapePrice = (price: Price): Money => {
  return {
    amount: price.amount.toString(),
    currencyCode: price.currencyCode
  };
};

const reshapeOptions = (variants: Product['variants']): ProductOption[] => {
  const options = new Map<string, Option>();

  variants.forEach((variant) => {
    variant.selectedOptions?.forEach((selectedOption) => {
      const option = selectedOption.option as Option;
      options.set(option.id, option);
    });
  });

  return Array.from(options, ([id, option]) => ({
    id,
    name: option.name,
    values: option.values.map((value) => value.label)
  }));
};

const reshapeSelectedOption = (
  selectedOptions: Product['variants'][0]['selectedOptions']
): Array<{ name: string; value: string }> => {
  return (selectedOptions ?? []).map((selectedOption) => {
    const option = selectedOption.option as Option;
    return {
      name: option.name,
      value: option.values.find(({ value }) => value === selectedOption.value)?.label!
    };
  });
};

const reshapeVariants = (variants: Product['variants']): ProductVariant[] => {
  return variants.map((variant) => ({
    id: variant.id!,
    title: `${variant.price.amount} ${variant.price.currencyCode}`,
    availableForSale: true,
    selectedOptions: reshapeSelectedOption(variant.selectedOptions),
    price: reshapePrice(variant.price)
  }));
};

const reshapeProduct = (product: Product): ExProduct => {
  return {
    id: product.id,
    handle: product.id,
    availableForSale: !product.disabled,
    title: product.title,
    description: product.description,
    descriptionHtml: product.description,
    options: reshapeOptions(product.variants),
    priceRange: {
      maxVariantPrice: reshapePrice(product.variants[0]?.price!),
      minVariantPrice: reshapePrice(product.variants[0]?.price!)
    },
    featuredImage: reshapeImage(product.media as Media),
    images: [],
    seo: {
      title: product.title,
      description: product.description
    },
    tags: product.tags ?? [],
    variants: reshapeVariants(product.variants),
    updatedAt: product.updatedAt
  };
};

export async function getCollectionProducts({
  collection,
  tag,
  reverse,
  sortKey
}: {
  collection?: string;
  tag?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<ExProduct[]> {
  const filters: Where[] = [];
  if (collection) {
    filters.push({
      categories: {
        equals: collection
      }
    });
  }
  if (tag) {
    filters.push({
      tags: {
        equals: collection
      }
    });
  }

  const products = await find<Product>('products', {
    where: {
      and: filters
    }
  });
  return products.docs.map(reshapeProduct);
}

const reshapeCategory = (category: Category): Collection => {
  return {
    handle: category.id,
    title: category.title,
    description: category.title,
    seo: {
      title: category.title,
      description: category.title
    },
    path: `/search/${category.id}`,
    updatedAt: category.updatedAt
  };
};

export async function getCollections(): Promise<Collection[]> {
  const categories = await find<Category>('categories', {});
  return [
    {
      handle: '',
      title: 'All',
      description: 'All products',
      seo: {
        title: 'All',
        description: 'All products'
      },
      path: '/search',
      updatedAt: new Date().toISOString()
    },
    ...categories.docs.map(reshapeCategory)
  ];
}

export async function getMenu(handle: string): Promise<Menu[]> {
  switch (handle) {
    case 'next-js-frontend-footer-menu':
      return [
        { title: 'About Medusa', path: 'https://medusajs.com/' },
        { title: 'Medusa Docs', path: 'https://docs.medusajs.com/' },
        { title: 'Medusa Blog', path: 'https://medusajs.com/blog' }
      ];
    case 'next-js-frontend-header-menu':
      return await getCollections();
    default:
      return [];
  }
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    cache: 'no-store',
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  return [];
}

export async function getProduct(handle: string): Promise<ExProduct | undefined> {
  const product = await findByID<Product>('products', handle);
  return reshapeProduct(product);
}

export async function getProductRecommendations(productId: string): Promise<ExProduct[]> {
  return [];
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<ExProduct[]> {
  let where: Where | undefined;
  if (query) {
    where = {
      or: [
        {
          title: {
            contains: query
          }
        },
        {
          description: {
            contains: query
          }
        }
      ]
    };
  }

  const products = await find<Product>('products', { where });
  return products.docs.map(reshapeProduct);
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 200 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections);
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products);
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
