import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS // Keep TAGS if used by other functions like getCollection, getProduct etc.
} from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import {
  revalidateTag,
  unstable_cacheTag as cacheTag, // Keep if used by other functions
  unstable_cacheLife as cacheLife  // Keep if used by other functions
} from 'next/cache';
import { cookies, headers } from 'next/headers'; // Keep 'cookies' if other cart mutations use it
import { NextRequest, NextResponse } from 'next/server';
import {
  addToCartMutation,
  createCartMutation,
  editCartItemsMutation,
  removeFromCartMutation
} from './mutations/cart';
// import { getCartQuery } from './queries/cart'; // No longer needed for dummy getCart
import {
  getCollectionProductsQuery,
  getCollectionQuery,
  getCollectionsQuery
} from './queries/collection';
// getMenuQuery is removed as getMenu is now returning dummy data
// import { getMenuQuery } from './queries/menu'; 
import { getPageQuery, getPagesQuery } from './queries/page';
import {
  getProductQuery,
  getProductRecommendationsQuery,
  getProductsQuery
} from './queries/product';
import {
  Cart, // Ensure Cart type is imported
  Collection,
  Connection,
  Image,
  Menu, // Menu type is essential
  Page,
  Product,
  ShopifyAddToCartOperation,
  ShopifyCart, // Still needed for other cart mutations if they use reshapeCart
  // ShopifyCartOperation, // No longer needed for dummy getCart
  ShopifyCollection,
  ShopifyCollectionOperation,
  ShopifyCollectionProductsOperation,
  ShopifyCollectionsOperation,
  ShopifyCreateCartOperation,
  // ShopifyMenuOperation is removed as getMenu is now returning dummy data
  // ShopifyMenuOperation, 
  ShopifyPageOperation,
  ShopifyPagesOperation,
  ShopifyProduct,
  ShopifyProductOperation,
  ShopifyProductRecommendationsOperation,
  ShopifyProductsOperation,
  ShopifyRemoveFromCartOperation,
  ShopifyUpdateCartOperation
} from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN
  ? ensureStartsWith(process.env.SHOPIFY_STORE_DOMAIN, 'https://')
  : '';
const endpoint = `${domain}${SHOPIFY_GRAPHQL_API_ENDPOINT}`;
const key = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

type ExtractVariables<T> = T extends { variables: object }
  ? T['variables']
  : never;

export async function shopifyFetch<T>({
  headers,
  query,
  variables
}: {
  headers?: HeadersInit;
  query: string;
  variables?: ExtractVariables<T>;
}): Promise<{ status: number; body: T } | never> {
  console.warn(`shopifyFetch called with query: ${query.substring(0, 100)}... This call is currently disabled for standalone dummy data mode.`);

  // Option 1: Throw an error to make it clear this path shouldn't be taken.
  throw new Error(`Shopify API calls are disabled in standalone dummy data mode. Query: ${query.substring(0,100)}...`);

  // Option 2: Return a mock error structure similar to what Shopify might send,
  // which some calling functions might expect or handle.
  // This is more complex as the exact 'T' for body is generic.
  // For now, throwing an error is simpler and makes unintended calls obvious.

  /*
  // Original fetch call - to be commented out or removed:
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
  */
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

// reshapeCart is kept as it's used by other cart mutation functions (createCart, addToCart, etc.)
const reshapeCart = (cart: ShopifyCart): Cart => {
  if (!cart.cost?.totalTaxAmount) {
    cart.cost.totalTaxAmount = {
      amount: '0.0',
      currencyCode: cart.cost.totalAmount.currencyCode
    };
  }

  return {
    ...cart,
    lines: removeEdgesAndNodes(cart.lines)
  };
};

const reshapeCollection = (
  collection: ShopifyCollection
): Collection | undefined => {
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

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)?.[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (
  product: ShopifyProduct,
  filterHiddenProducts: boolean = true
) => {
  if (
    !product ||
    (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))
  ) {
    return undefined;
  }

  const { images, variants, ...rest } = product;

  return {
    ...rest,
    images: reshapeImages(images, product.title),
    variants: removeEdgesAndNodes(variants)
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

export async function createCart(): Promise<Cart> {
  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation
  });

  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyAddToCartOperation>({
    query: addToCartMutation,
    variables: {
      cartId,
      lines
    }
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
}

export async function removeFromCart(lineIds: string[]): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyRemoveFromCartOperation>({
    query: removeFromCartMutation,
    variables: {
      cartId,
      lineIds
    }
  });

  return reshapeCart(res.body.data.cartLinesRemove.cart);
}

export async function updateCart(
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  const cartId = (await cookies()).get('cartId')?.value!;
  const res = await shopifyFetch<ShopifyUpdateCartOperation>({
    query: editCartItemsMutation,
    variables: {
      cartId,
      lines
    }
  });

  return reshapeCart(res.body.data.cartLinesUpdate.cart);
}

export async function getCart(): Promise<Cart | undefined> {
  console.log('getCart called - returning dummy cart data / undefined.'); // For observability

  // Using Option 2 from the example: Return a basic dummy cart structure
  const dummyCart: Cart = {
    id: 'dummy-cart-id-123',
    checkoutUrl: '/cart-checkout', // Or some placeholder
    cost: {
      subtotalAmount: { amount: '100.00', currencyCode: 'USD' },
      totalAmount: { amount: '105.00', currencyCode: 'USD' }, // Including some dummy tax/shipping
      totalTaxAmount: { amount: '5.00', currencyCode: 'USD' }
    },
    lines: [
      {
        id: 'dummy-line-item-1',
        quantity: 2,
        cost: {
          totalAmount: { amount: '50.00', currencyCode: 'USD' }
        },
        merchandise: {
          id: 'dummy-merch-id-1',
          title: 'Dummy Product A',
          selectedOptions: [{ name: 'Color', value: 'Red' }],
          product: { // Ensure this matches the Product type expected by CartLine.merchandise.product
            id: 'dummy-prod-id-A',
            handle: 'dummy-product-a',
            title: 'Dummy Product A',
            // featuredImage, priceRange, etc., might be needed if CartLine.merchandise.product expects a full Product
            // For this dummy data, keeping it minimal as per example.
            // Add other Product fields if Cart type expects them from merchandise.product
            // Based on current 'Product' type, these are the minimum required:
            availableForSale: true,
            description: 'A dummy product',
            descriptionHtml: '<p>A dummy product</p>',
            images: [], // Assuming empty array is acceptable or provide dummy images
            options: [],
            priceRange: {
              maxVariantPrice: { amount: '25.00', currencyCode: 'USD' },
              minVariantPrice: { amount: '25.00', currencyCode: 'USD' }
            },
            seo: { title: 'Dummy Product A', description: 'Dummy A' },
            tags: [],
            updatedAt: new Date().toISOString(),
            variants: [], // Assuming empty array is acceptable or provide dummy variants
          }
        }
      },
      {
        id: 'dummy-line-item-2',
        quantity: 1,
        cost: {
          totalAmount: { amount: '50.00', currencyCode: 'USD' }
        },
        merchandise: {
          id: 'dummy-merch-id-2',
          title: 'Dummy Product B',
          selectedOptions: [{ name: 'Size', value: 'M' }],
          product: { // Ensure this matches the Product type expected by CartLine.merchandise.product
            id: 'dummy-prod-id-B',
            handle: 'dummy-product-b',
            title: 'Dummy Product B',
            availableForSale: true,
            description: 'Another dummy product',
            descriptionHtml: '<p>Another dummy product</p>',
            images: [],
            options: [],
            priceRange: {
              maxVariantPrice: { amount: '50.00', currencyCode: 'USD' },
              minVariantPrice: { amount: '50.00', currencyCode: 'USD' }
            },
            seo: { title: 'Dummy Product B', description: 'Dummy B' },
            tags: [],
            updatedAt: new Date().toISOString(),
            variants: [],
          }
        }
      }
    ],
    totalQuantity: 3
  };

  await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
  
  // To test the "empty cart" scenario, you can conditionally return undefined or dummyCart here.
  // For now, let's return the dummyCart.
  return dummyCart; 
  // return undefined; // Use this to test how Navbar/CartProvider handles no cart
}


export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyCollectionOperation>({
    query: getCollectionQuery,
    variables: {
      handle
    }
  });

  return reshapeCollection(res.body.data.collection);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.collections, TAGS.products);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyCollectionProductsOperation>({
    query: getCollectionProductsQuery,
    variables: {
      handle: collection,
      reverse,
      sortKey: sortKey === 'CREATED_AT' ? 'CREATED' : sortKey
    }
  });

  if (!res.body.data.collection) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }

  return reshapeProducts(
    removeEdgesAndNodes(res.body.data.collection.products)
  );
}

export async function getCollections(): Promise<Collection[]> {
  'use cache';
  cacheTag(TAGS.collections);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyCollectionsOperation>({
    query: getCollectionsQuery
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
  console.log(`getMenu called with handle: ${handle} - returning dummy menu data.`); // For observability

  // Dummy menu structure. Modify as needed to match typical menu items.
  const dummyMenu: Menu[] = [
    { title: 'Home', path: '/' },
    { title: 'All Products', path: '/search' }, // Example link to a general product listing
    { title: 'T-Shirts', path: '/search/t-shirts' }, // Example link to a specific collection
    { title: 'About Us', path: '/content/about-us' },
    { title: 'Contact Us', path: '/content/contact-us' },
    { title: 'Login', path: '/login' },
    // { title: 'My Page', path: '/my-page' }, // Potentially conditional
    // { title: 'Cart', path: '/cart-checkout' } // Link to the dedicated cart page
  ];

  // Simulate a slight delay if desired, like other dummy data functions
  await new Promise(resolve => setTimeout(resolve, 50));

  return dummyMenu;
}

export async function getPage(handle: string): Promise<Page> {
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyProductOperation>({
    query: getProductQuery,
    variables: {
      handle
    }
  });

  return reshapeProduct(res.body.data.product, false);
}

export async function getProductRecommendations(
  productId: string
): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyProductRecommendationsOperation>({
    query: getProductRecommendationsQuery,
    variables: {
      productId
    }
  });

  return reshapeProducts(res.body.data.productRecommendations);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  'use cache';
  cacheTag(TAGS.products);
  cacheLife('days');

  const res = await shopifyFetch<ShopifyProductsOperation>({
    query: getProductsQuery,
    variables: {
      query,
      reverse,
      sortKey
    }
  });

  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
}

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    'collections/create',
    'collections/delete',
    'collections/update'
  ];
  const productWebhooks = [
    'products/create',
    'products/delete',
    'products/update'
  ];
  const topic = (await headers()).get('x-shopify-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPIFY_REVALIDATION_SECRET) {
    console.error('Invalid revalidation secret.');
    return NextResponse.json({ status: 401 });
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
