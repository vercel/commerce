import { isMedusaError } from 'lib/type-guards';

import { mapOptionIds } from 'lib/utils';
import {
  Cart,
  CartItem,
  MedusaCart,
  MedusaLineItem,
  MedusaProduct,
  MedusaProductCollection,
  MedusaProductOption,
  MedusaProductVariant,
  Product,
  ProductCollection,
  ProductOption,
  ProductVariant,
  SelectedOption
} from './types';

// const endpoint = `${process.env.MEDUSA_BACKEND_API!}`;
const endpoint = `http://localhost:9000/store`;

export default async function medusaRequest(
  method: string,
  path = '',
  payload?: Record<string, unknown> | undefined
) {
  const options: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  };

  if (payload) {
    options.body = JSON.stringify(payload);
  }

  try {
    const result = await fetch(`${endpoint}/${path}`, options);

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body
    };
  } catch (e) {
    if (isMedusaError(e)) {
      throw {
        status: e.status || 500,
        message: e.message
      };
    }

    throw {
      error: e
    };
  }
}

const reshapeCart = (cart: MedusaCart): Cart => {
  const lines = cart.items?.map((item) => reshapeLineItem(item)) || [];
  const totalQuantity = lines.length;
  const checkoutUrl = '/';
  const currencyCode = 'EUR';
  const cost = {
    subtotalAmount: {
      amount:
        (cart?.tax_total && cart?.total && (cart?.total - cart?.tax_total).toString()) ||
        cart?.total?.toString() ||
        '0',
      currencyCode: currencyCode
    },
    totalAmount: {
      amount: (cart?.total && cart?.total.toString()) || '0',
      currencyCode: currencyCode
    },
    totalTaxAmount: {
      amount: (cart?.tax_total && cart?.tax_total.toString()) || '0',
      currencyCode: currencyCode
    }
  };

  return {
    ...cart,
    totalQuantity,
    checkoutUrl,
    lines,
    cost
  };
};

const reshapeLineItem = (lineItem: MedusaLineItem): CartItem => {
  const product = {
    priceRange: {
      maxVariantPrice: {
        amount: lineItem.variant?.prices?.[0]?.amount.toString() ?? '0',
        currencyCode: lineItem.variant?.prices?.[0]?.currency_code ?? 'EUR'
      }
    },
    updatedAt: lineItem.updated_at,
    tags: [],
    descriptionHtml: lineItem.description ?? '',
    featuredImage: {
      url: lineItem.thumbnail ?? '',
      altText: lineItem.title ?? ''
    },
    availableForSale: true,
    variants: [lineItem.variant && reshapeProductVariant(lineItem.variant)],
    handle: lineItem.variant?.product?.handle ?? ''
  };

  const selectedOptions =
    lineItem.variant?.options?.map((option) => ({
      name: option.option?.title ?? '',
      value: option.value
    })) || [];

  const merchandise = {
    id: lineItem.variant_id || lineItem.id,
    selectedOptions,
    product,
    title: lineItem.title
  };

  const cost = {
    totalAmount: {
      amount: lineItem.total.toString() ?? '0',
      currencyCode: 'EUR'
    }
  };
  const quantity = lineItem.quantity;

  return {
    ...lineItem,
    merchandise,
    cost,
    quantity
  };
};

const reshapeProduct = (product: MedusaProduct): Product => {
  console.log({
    amount: product.variants?.[0]?.prices?.[0]?.amount
  });
  const priceRange = {
    maxVariantPrice: {
      amount: product.variants?.[0]?.prices?.[0]?.amount.toString() ?? '0',
      currencyCode: product.variants?.[0]?.prices?.[0]?.currency_code ?? ''
    }
  };
  console.log({ priceRange });
  const updatedAt = product.updated_at;
  const tags = product.tags?.map((tag) => tag.value) || [];
  const descriptionHtml = product.description ?? '';
  const featuredImage = {
    url: product.images?.[0]?.url ?? '',
    altText: product.images?.[0]?.id ?? ''
  };
  const availableForSale = true;
  const variants = product.variants.map((variant) =>
    reshapeProductVariant(variant, product.options)
  );

  let options;
  product.options && (options = product.options.map((option) => reshapeProductOption(option)));

  return {
    ...product,
    featuredImage,
    priceRange,
    updatedAt,
    tags,
    descriptionHtml,
    availableForSale,
    options,
    variants
  };
};

const reshapeProductOption = (productOption: MedusaProductOption): ProductOption => {
  const availableForSale = true;
  const name = productOption.title;
  let values = productOption.values?.map((option) => option.value) || [];
  values = [...new Set(values)];

  return {
    ...productOption,
    availableForSale,
    name,
    values
  };
};

const reshapeProductVariant = (
  productVariant: MedusaProductVariant,
  productOptions?: MedusaProductOption[]
): ProductVariant => {
  let selectedOptions: SelectedOption[] = [];
  if (productOptions && productVariant.options) {
    const optionIdMap = mapOptionIds(productOptions);
    selectedOptions = productVariant.options.map((option) => ({
      name: optionIdMap[option.option_id] ?? '',
      value: option.value
    }));
  }
  const availableForSale = !!productVariant.inventory_quantity;

  const price = {
    amount: productVariant.prices?.[0]?.amount.toString() ?? 'ß',
    currencyCode: productVariant.prices?.[0]?.currency_code ?? ''
  };
  return {
    ...productVariant,
    availableForSale,
    selectedOptions,
    price
  };
};

const reshapeCollection = (collection: MedusaProductCollection): ProductCollection => {
  const description = collection.metadata?.description?.toString() ?? '';
  const seo = {
    title: collection?.metadata?.seo_title?.toString() ?? '',
    description: collection?.metadata?.seo_description?.toString() ?? ''
  };
  const path = `/${collection.handle}`;
  const updatedAt = collection.updated_at;

  return {
    ...collection,
    description,
    seo,
    path,
    updatedAt
  };
};

export async function createCart(): Promise<Cart> {
  const res = await medusaRequest('POST', '/carts', {});
  return reshapeCart(res.body.cart);
}

export async function addToCart(
  cartId: string,
  lineItem: { variantId: string; quantity: number }
): Promise<Cart> {
  const res = await medusaRequest('POST', `/carts/${cartId}/line-items`, {
    variant_id: lineItem?.variantId,
    quantity: lineItem?.quantity
  });
  return reshapeCart(res.body.cart);
}

export async function removeFromCart(cartId: string, lineItemId: string): Promise<Cart> {
  const res = await medusaRequest('DELETE', `/carts/${cartId}/line-items/${lineItemId}`);
  return reshapeCart(res.body.cart);
}

export async function updateCart(
  cartId: string,
  { lineItemId, quantity }: { lineItemId: string; quantity: number }
): Promise<Cart> {
  const res = await medusaRequest('POST', `/carts/${cartId}/line-items/${lineItemId}`, {
    quantity
  });
  return reshapeCart(res.body.cart);
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await medusaRequest('GET', `/carts/${cartId}`);
  const cart = res.body.cart;

  if (!cart) {
    return null;
  }

  return reshapeCart(cart);
}

export async function getCollection(handle: string): Promise<ProductCollection | undefined> {
  const res = await medusaRequest('GET', `/collections?handle[]=${handle}&limit=1`);
  return res.body.collections[0];
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  const collection = await getCollection(handle);

  if (!collection) {
    return [];
  }

  const res = await medusaRequest('GET', `/products?collection_id[]=${collection.id}`);

  if (!res.body?.products) {
    return [];
  }

  const products: Product[] = res.body.products.map((product: MedusaProduct) =>
    reshapeProduct(product)
  );

  return products;
}

export async function getCollections(): Promise<ProductCollection[]> {
  const res = await medusaRequest('GET', '/collections');

  const collections: ProductCollection[] = res.body.collections.map(
    (collection: MedusaProductCollection) => reshapeCollection(collection)
  );

  return collections;
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await medusaRequest('GET', `/products?handle=${handle}&limit=1`);
  const product = res.body.products[0];
  return reshapeProduct(product);
}

export async function getProducts({
  query
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await medusaRequest('get', `/products?q=${query}&limit=20`);
  const products: Product[] = res.body.products.map((product: MedusaProduct) =>
    reshapeProduct(product)
  );
  return products;
}
