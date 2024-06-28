import { SHOPIFY_GRAPHQL_API_ENDPOINT, TAGS } from 'lib/constants';
import { find, findByID } from 'lib/shopify/payload';
import { Media, Option, Product, Tag } from 'lib/shopify/payload-types';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import { revalidateTag } from 'next/cache';
import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { getCollectionQuery, getCollectionsQuery } from './queries/collection';
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  Cart,
  Collection,
  Connection,
  Product as ExProduct,
  Image,
  Menu,
  Money,
  Page,
  ProductOption,
  ProductVariant,
  ShopifyAddToCartOperation,
  ShopifyCart,
  ShopifyCartOperation,
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  ShopifyPageOperation,
  ShopifyPagesOperation,
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

const reshapeCollection = (collection: ShopifyCollection): Collection | undefined => {
  if (!collection) {
    return undefined;
  }

  return {
    ...collection,
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
  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    tags: [TAGS.collections],
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
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

const reshapeVariants = (variants: Product['variants']): ProductVariant[] => {
  return variants.map((variant) => ({
    id: variant.id!,
    title: `${variant.price.amount} ${variant.price.currencyCode}`,
    availableForSale: true,
    selectedOptions: (variant.selectedOptions ?? []).map((selectedOption) => {
      const option = selectedOption.option as Option;
      return {
        name: option.name,
        value: option.values.find(({ value }) => value === selectedOption.value)?.label!
      };
    }),
    price: reshapePrice(variant.price)
  }));
};

const reshapeTags = (tags: Tag[]): string[] => {
  return tags.map((tag) => tag.name);
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
    tags: reshapeTags(product.tags as Tag[]),
    variants: reshapeVariants(product.variants),
    updatedAt: product.updatedAt
  };
};

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<ExProduct[]> {
  const products = await find<Product>('products', {});
  return products.docs.map(reshapeProduct);
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
      updatedAt: new Date().toISOString()
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
  return [];
  // const res = await shopifyFetch<ShopifyMenuOperation>({
  //   query: getMenuQuery,
  //   tags: [TAGS.collections],
  //   variables: {
  //     handle
  //   }
  // });

  // return (
  //   res.body?.data?.menu?.items.map((item: { title: string; url: string }) => ({
  //     title: item.title,
  //     path: item.url.replace(domain, '').replace('/collections', '/search').replace('/pages', '')
  //   })) || []
  // );
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
  const products = await find<Product>('products', {});
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
