import { isMedusaError } from 'lib/type-guards';
import {
  Cart,
  MedusaCart,
  MedusaProduct,
  MedusaProductCollection,
  Product,
  ProductCollection
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
  const lines = cart.items;
  const totalQuantity = cart.items.length || 0;

  return {
    ...cart,
    totalQuantity,
    lines
  };
};

const reshapeProduct = (product: MedusaProduct): Product => {
  const featuredImage = {
    url: product.images?.[0]?.url ?? ''
  };
  const priceRange = {
    maxVariantPrice: {
      amount: product.variants?.[0]?.prices?.[0]?.amount.toString() ?? '',
      currencyCode: product.variants?.[0]?.prices?.[0]?.currency_code ?? ''
    }
  };
  const updatedAt = product.updated_at;

  return {
    ...product,
    featuredImage,
    priceRange,
    updatedAt
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
  console.log('Cart created!');
  console.log(res);
  return reshapeCart(res.body.cart);
}

export async function addToCart(
  cartId: string,
  lineItems: { variantId: string; quantity: number }[]
): Promise<Cart> {
  console.log(lineItems);
  // TODO: transform lines into Medusa line items
  const res = await medusaRequest('POST', `/carts/${cartId}/line-items`, {
    lineItems
  });

  return res.body.data.cart;
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  // TODO: We only allow you to pass a single line item to delete
  const res = await medusaRequest('DELETE', `/carts/${cartId}/line-items/${lineIds[0]}`);

  return res.body.data.cart;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  console.log(lines);
  // TODO: transform lines into Medusa line items
  const res = await medusaRequest('POST', `/carts/${cartId}`, {});
  return res.body.data.cart;
}

export async function getCart(cartId: string): Promise<Cart | null> {
  const res = await medusaRequest('GET', `/carts/${cartId}`);

  if (!res.body.cart) {
    return null;
  }

  return res.body.cart;
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
  const res = await medusaRequest('get', `/products?handle=${handle}&limit=1`);
  return res.body.product;
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
