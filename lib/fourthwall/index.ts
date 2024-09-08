import { Menu, Product } from "lib/shopify/types";
import { reshapeProducts } from "./reshape";

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
 * Calls
 */

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const res = await fourthwallGet<{results: any[]}>(`${process.env.FW_URL}/api/public/v1.0/collections/${collection}/products?secret=${process.env.FW_SECRET}`, {
    headers: {
      'X-ShopId': process.env.FW_SHOPID || ''
    }
  });

  if (!res.body.results) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }


  return reshapeProducts(res.body.results);
}


/**
 * Stubbed out
 */
export async function getMenu(handle: string): Promise<Menu[]> {
  return [];
}
