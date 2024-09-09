import { Cart, Menu, Product } from "lib/shopify/types";
import { reshapeCart, reshapeProduct, reshapeProducts } from "./reshape";
import { FourthwallCart, FourthwallCheckout, FourthwallProduct } from "./types";

const API_URL = process.env.FW_API_URL
const API_SECRET = process.env.FW_SECRET

/**
 * Helpers
 */
async function fourthwallGet<T>(url: string, options: RequestInit = {}): Promise<{ status: number; body: T }> {
  try {
    const result = await fetch(
      url,
      {
        method: 'GET',
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      }
    );

    const body = await result.json();

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      url
    };
  }
}

async function fourthwallPost<T>(url: string, data: any, options: RequestInit = {}): Promise<{ status: number; body: T }> {
  try {
    const result = await fetch(url, {
      method: 'POST',
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      body: JSON.stringify(data)
    });

    const body = await result.json();

    return {
      status: result.status,
      body
    };
  } catch (e) {
    throw {
      error: e,
      url,
      data
    };
  }
}

/**
 * Collection operations
 */
export async function getCollectionProducts({
  collection,
  currency,
  reverse,
  sortKey
}: {
  collection: string;
  currency: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await fourthwallGet<{results: FourthwallProduct[]}>(`${API_URL}/api/public/v1.0/collections/${collection}/products?secret=${API_SECRET}&currency=${currency}`, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    }
  });

  if (!res.body.results) {
    console.warn(`No collection found for \`${collection}\``);
    return [];
  }


  return reshapeProducts(res.body.results);
}

/**
 * Product operations
 */
export async function getProduct({ handle, currency } : { handle: string, currency: string }): Promise<Product | undefined> {
  // TODO: replace with real URL
  const res = await fourthwallGet<FourthwallProduct>(`${API_URL}/api/public/v1.0/products/${handle}?secret=${API_SECRET}&currency=${currency}`, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    }
  });

  return reshapeProduct(res.body);
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  // TODO: replace with real URL
  return [];
}

/**
 * Cart operations
 */
export async function getCart(cartId: string | undefined, currency: string): Promise<Cart | undefined> {
  if (!cartId) {
    return undefined;
  }

  const res = await fourthwallGet<FourthwallCart>(`${API_URL}/api/public/v1.0/carts/${cartId}?secret=${API_SECRET}&currency=${currency}`, {
    cache: 'no-store'
  });

  return reshapeCart(res.body);
}

export async function createCart(): Promise<Cart> {
  const res = await fourthwallPost<FourthwallCart>(`https://api.staging.fourthwall.com/api/public/v1.0/carts?secret=${API_SECRET}`, {
    items: []
  }, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    }
  });

  return reshapeCart(res.body);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {

  const items = lines.map((line) => ({
    variantId: line.merchandiseId,
    quantity: line.quantity
  }));

  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/api/public/v1.0/carts/${cartId}/add?secret=${API_SECRET}`, {
    items,
  }, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    },
    cache: 'no-store'    
  });

  return reshapeCart(res.body);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const items = lineIds.map((id) => ({
    variantId: id
  }));

  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/api/public/v1.0/carts/${cartId}/remove?secret=${API_SECRET}`, {
    items,
  }, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const items = lines.map((line) => ({
    variantId: line.merchandiseId,
    quantity: line.quantity
  }));

  const res = await fourthwallPost<FourthwallCart>(`${API_URL}/api/public/v1.0/carts/${cartId}/change?secret=${API_SECRET}`, {
    items,
  }, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    },
    cache: 'no-store'
  });

  return reshapeCart(res.body);
}

export async function createCheckout(
  cartId: string,
  cartCurrency: string
): Promise<FourthwallCheckout> {
  const res = await fourthwallPost<{ id: string }>(`${API_URL}/api/public/v1.0/checkouts?secret=${API_SECRET}`, {
    cartId,
    cartCurrency
  }, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    }
  });

  return res.body;
}

/**
 * TODO: Stubbed out
 */
export async function getMenu(handle: string): Promise<Menu[]> {
  return [];
}
