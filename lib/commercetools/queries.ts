import { Product, Cart, Collection, Menu, Page } from "./types";
import { DUMMY_CURRENCY_CODE, DUMMY_LOCALE, DUMMY_COUNTRY, DUMMY_LIMIT } from "./dummy-data";
import apiRoot from "lib/commercetools/client-builder";
import { NextRequest, NextResponse } from "next/server";
import {
  reshapeCategory,
  reshapeCategories,
  reshapeProductProjection,
  reshapeProductProjections,
  reshapeCart
} from "./reshapes";

export async function getCollection(handle: string): Promise<Collection | undefined> {
  try {
    const response = await apiRoot
      .categories()
      .get({
        queryArgs: {
          where: `slug(${DUMMY_LOCALE}="${handle}")`
        }
      })
      .execute();

    const matchedCategory = response.body.results[0];

    if (!matchedCategory) return undefined;

    return reshapeCategory(matchedCategory);
  } catch (err) {
    return undefined;
  }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const response = await apiRoot.categories().get().execute();
    return reshapeCategories(response.body.results);
  } catch (err) {
    return [];
  }
}

/**
 * Requests a productprojection based on its handle (slug) from commercetools and reshapes it.
 *
 * @param {string} handle - The handle (slug) of the product.
 * @returns {Promise<Product | undefined>} A promise resolving to the retrieved product or undefined if not found.
 */
export async function getProduct(handle: string): Promise<Product | undefined> {
  try {
    const response = await apiRoot
      .productProjections()
      .get({
        queryArgs: {
          where: `slug(${DUMMY_LOCALE}="${handle}")`,
          priceCurrency: DUMMY_CURRENCY_CODE,
          priceCountry: DUMMY_COUNTRY
        }
      })
      .execute();

    const matchedProductProjection = response.body.results[0];

    if (!matchedProductProjection) return undefined;

    return reshapeProductProjection(matchedProductProjection);
  } catch (err) {
    return undefined;
  }
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  return [];
}

/**
 * Requests a list of product projections based on optional query, sort key and reverse flag from commercetools and reshapes it.
 *
 * @param {Object} options - The options object containing query, reverse, and sortKey.
 * @param {string} [options.query] - The optional query string for commercetools fulltext search.
 * @param {boolean} [options.reverse] - Flag to indicate whether to reverse the products list.
 * @param {string} [options.sortKey] - The key to sort the products ().
 * @returns {Promise<Product[]>} A promise resolving to an array of products.
 */
export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  try {
    const response = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: DUMMY_LIMIT,
          [`text.${DUMMY_LOCALE}`]: query,
          priceCurrency: DUMMY_CURRENCY_CODE,
          priceCountry: DUMMY_COUNTRY,
          sort: sortKey
        }
      })
      .execute();

    const products = reshapeProductProjections(response.body.results);

    return reverse ? products.reverse() : products;
  } catch (err) {
    return [];
  }
}

/**
 * Requests a list of product projections filtered by a collection (category) based on optional sort key and reverse flag from commercetools and reshapes it.
 *
 * @param {Object} options - The options object containing query, reverse, and sortKey.
 * @param {collection} [options.collection] - Handle (slug) of collection
 * @param {boolean} [options.reverse] - Flag to indicate whether to reverse the products list.
 * @param {string} [options.sortKey] - The key to sort the products ().
 * @returns {Promise<Product[]>} A promise resolving to an array of products.
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
  try {
    // Get category by slug
    const categoriesResponse = await apiRoot
      .categories()
      .get({ queryArgs: { where: `slug(${DUMMY_LOCALE}="${collection}")` } })
      .execute();

    const categoryId = categoriesResponse.body.results[0]?.id;

    if (!categoryId) return [];

    // Get filtered product projections
    const productProjectionsResponse = await apiRoot
      .productProjections()
      .search()
      .get({
        queryArgs: {
          limit: DUMMY_LIMIT,
          filter: `categories.id:"${categoryId}"`,
          priceCurrency: DUMMY_CURRENCY_CODE,
          priceCountry: DUMMY_COUNTRY,
          sort: sortKey
        }
      })
      .execute();

    const products = reshapeProductProjections(productProjectionsResponse.body.results);

    return reverse ? products.reverse() : products;
  } catch (err) {
    return [];
  }
}

export async function getCart(cartId: string): Promise<Cart | undefined> {
  try {
    const response = await apiRoot.carts().withId({ ID: cartId }).get().execute();
    return reshapeCart(response.body);
  } catch (err) {
    return undefined;
  }
}

export async function createCart(): Promise<Cart> {
  const response = await apiRoot
    .carts()
    .post({ body: { currency: DUMMY_CURRENCY_CODE, country: DUMMY_COUNTRY } })
    .execute();

  return reshapeCart(response.body);
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const activeCartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const version = activeCartResponse.body.version;

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: lines.map((line) => ({
          action: "changeLineItemQuantity",
          lineItemId: line.id,
          quantity: line.quantity
        }))
      }
    })
    .execute();

  return reshapeCart(response.body);
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const activeCartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const version = activeCartResponse.body.version;

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: lines.map((line) => ({
          action: "addLineItem",
          sku: line.merchandiseId,
          quantity: line.quantity
        }))
      }
    })
    .execute();

  return reshapeCart(response.body);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<Cart> {
  const activeCartResponse = await apiRoot.carts().withId({ ID: cartId }).get().execute();
  const version = activeCartResponse.body.version;

  const response = await apiRoot
    .carts()
    .withId({ ID: cartId })
    .post({
      body: {
        version,
        actions: lineIds.map((lineId) => ({
          action: "removeLineItem",
          lineItemId: lineId
        }))
      }
    })
    .execute();

  return reshapeCart(response.body);
}

export async function getMenu(handle: string): Promise<Menu[]> {
  switch (handle) {
    case "next-js-frontend-footer-menu":
      return [
        { title: "Über uns", path: "/" },
        { title: "Kontakt", path: "/" },
        { title: "Impressum", path: "/" }
      ];
    case "next-js-frontend-header-menu":
      return [{ title: "Alle Produkte", path: "/search" }];
    default:
      return [];
  }
}

export async function getPage(handle: string): Promise<Page> {
  return {
    id: handle,
    title: handle,
    handle: handle,
    body: handle,
    bodySummary: handle,
    createdAt: new Date().toLocaleDateString(),
    updatedAt: new Date().toLocaleDateString()
  };
}

export async function getPages(): Promise<Page[]> {
  return [];
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({ status: 200 });
}
