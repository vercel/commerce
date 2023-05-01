import { isShopifyError } from 'lib/type-guards';
import { Cart, Collection, Product } from './types';

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
    if (isShopifyError(e)) {
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

export async function createCart(): Promise<Cart> {
  const res = await medusaRequest('POST', '/carts', {});
  return res.body.cart;
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  console.log(lines);
  // TODO: transform lines into Medusa line items
  const res = await medusaRequest('POST', `/carts/${cartId}/line-items`, {
    variant_id: 'something',
    quantity: 1
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

export async function getCollection(handle: string): Promise<Collection | undefined> {
  const res = await medusaRequest('get', `/collections?handle[]=${handle}&limit=1`);
  return res.body.collection;
}

export async function getCollectionProducts(handle: string): Promise<Product[]> {
  const res = await medusaRequest('get', `/collections?handle[]=${handle}&expand=products`);
  if (!res.body?.collection?.products) {
    return [];
  }

  return res.body.collection.products;
}

export async function getCollections(): Promise<Collection[]> {
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
      updatedAt: new Date().toISOString()
    }
  ];

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
  return res.body.products;
}
