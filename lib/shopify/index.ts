import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { stripe } from 'lib/shopify/stripe';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  BaseProduct,
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Money,
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCreateCartOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const CURRENT_DATE = new Date().toISOString();

const COLLECTIONS: Collection[] = [
  {
    handle: '',
    title: 'All',
    description: 'All products',
    seo: {
      title: 'All',
      description: 'All products'
    },
    path: '/search',
    updatedAt: CURRENT_DATE
  },
  {
    handle: 'shirts',
    title: 'Shirts',
    description: 'Shirts',
    seo: {
      title: 'Shirts',
      description: 'Shirts'
    },
    path: '/search',
    updatedAt: CURRENT_DATE
  }
];

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

const reshapeCart = (cart: ShopifyCart): Cart => {
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

  return reshapeCart(res.body.data.cart);
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  return COLLECTIONS.find((collection) => collection.handle === handle);
}

const reshapePrice = (price: Stripe.Price | null | undefined): Money | undefined => {
  if (!price) {
    return;
  }

  return {
    amount: price.unit_amount ? (price.unit_amount / 100).toString() : '',
    currencyCode: price.currency
  };
};

const reshapeImage = (url: string, productTitle: string): Image => {
  const filename = url.match(/.*\/(.*)\..*/)?.[1];
  return {
    url,
    altText: `${productTitle} - ${filename}`
  };
};

const reshapeTags = (metadata: Stripe.Metadata): string[] => {
  return metadata.tags?.split(',') ?? [];
};

const reshapeDate = (millis: number) => {
  return new Date(millis).toISOString();
};

const reshapeBaseProduct = (product: Stripe.Product): BaseProduct => {
  return {
    id: product.id,
    handle: product.id,
    availableForSale: product.active,
    title: product.name,
    description: product.description,
    descriptionHtml: product.description,
    options: [],
    priceRange: {
      maxVariantPrice: reshapePrice(product.default_price as Stripe.Price)
    },
    featuredImage: product.images.length
      ? reshapeImage(product.images[0]!, product.name)
      : undefined,
    images: product.images.map((image) => reshapeImage(image, product.name)),
    seo: {
      title: product.name,
      description: product.description
    },
    tags: reshapeTags(product.metadata),
    updatedAt: reshapeDate(product.updated),
    createdAt: reshapeDate(product.created)
  };
};

const sortProducts = (
  products: BaseProduct[],
  sortKey?: string,
  reverse?: boolean
): BaseProduct[] => {
  sortKey === 'PRICE' &&
    products.sort(
      (a, b) =>
        parseFloat(a.priceRange.maxVariantPrice?.amount ?? '0') -
        parseFloat(b.priceRange.maxVariantPrice?.amount ?? '0')
    );

  sortKey === 'CREATED_AT' &&
    products.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  reverse && products.reverse();

  return products;
};

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
  limit
}: {
  collection?: string;
  reverse?: boolean;
  sortKey?: string;
  limit?: number;
}): Promise<BaseProduct[]> {
  const filters = ['active:"true"'];
  if (collection) {
    filters.push(`metadata["collection"]:"${collection}"`);
  }

  const res = await stripe.products.search({
    limit,
    query: filters.join(' AND '),
    expand: ['data.default_price']
  });

  const products = res.data.map(reshapeBaseProduct);
  return sortProducts(products, sortKey, reverse);
}

export async function getCollections(): Promise<Collection[]> {
  return COLLECTIONS;
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
      return [
        { title: 'All', path: '/search' },
        { title: 'Shirts', path: '/search/shirts' },
        { title: 'Stickers', path: '/search/stickers' }
      ];
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
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery,
    cache: 'no-store'
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const res = await stripe.products.retrieve(handle, { expand: ['default_price'] });
  return { ...reshapeBaseProduct(res), variants: [] };
}

export async function getProductRecommendations(productId: string): Promise<BaseProduct[]> {
  const filters = ['active:"true"'];
  filters.push(`metadata["parent"]:"${productId}"`);

  const res = await stripe.products.search({
    query: filters.join(' AND '),
    expand: ['data.default_price']
  });

  return res.data.map(reshapeBaseProduct);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<BaseProduct[]> {
  const filters = ['active:"true"'];
  if (query) {
    filters.push(`name~"${query}"`);
  }

  const res = await stripe.products.search({
    query: filters.join(' AND '),
    expand: ['data.default_price']
  });

  const products = res.data.map(reshapeBaseProduct);
  return sortProducts(products, sortKey, reverse);
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
