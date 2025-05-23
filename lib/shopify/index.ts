import {
  HIDDEN_PRODUCT_TAG,
  SHOPIFY_GRAPHQL_API_ENDPOINT,
  TAGS 
} from 'lib/constants';
import { isShopifyError } from 'lib/type-guards';
import { ensureStartsWith } from 'lib/utils';
import {
  revalidateTag,
  unstable_cacheTag as cacheTag, 
  unstable_cacheLife as cacheLife  
} from 'next/cache';
import { cookies, headers } from 'next/headers'; 
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
  getProductRecommendationsQuery, // Ensure this is imported
  getProductsQuery 
} from './queries/product';
import {
  Cart, 
  Collection, 
  Connection,
  Image, 
  Menu, 
  Page, 
  Product, 
  ShopifyAddToCartOperation, 
  ShopifyCart, 
  ShopifyCartOperation, // Needed for live getCart
  ShopifyCollection, 
  ShopifyCollectionOperation, 
  ShopifyCollectionProductsOperation, 
  ShopifyCollectionsOperation, 
  ShopifyCreateCartOperation, 
  // ShopifyMenuOperation, // No longer needed for dummy getMenu
  ShopifyPageOperation, 
  ShopifyPagesOperation, 
  ShopifyProduct, 
  ShopifyProductOperation, 
  ShopifyProductRecommendationsOperation, // Needed for live getProductRecommendations
  ShopifyProductsOperation, 
  ShopifyRemoveFromCartOperation, 
  ShopifyUpdateCartOperation, 
  Money, 
  ProductOption, 
  ProductVariant,
  SEO 
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
}

const removeEdgesAndNodes = <T>(array: Connection<T>): T[] => {
  return array.edges.map((edge) => edge?.node);
};

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

const DEFAULT_DUMMY_CART: Cart = {
  id: 'dummy-cart-id-123',
  checkoutUrl: '/cart-checkout', 
  cost: {
    subtotalAmount: { amount: '100.00', currencyCode: 'USD' },
    totalAmount: { amount: '105.00', currencyCode: 'USD' }, 
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
        product: { 
          id: 'dummy-prod-id-A',
          handle: 'dummy-product-a',
          title: 'Dummy Product A', 
          featuredImage: { 
            url: '/placeholder-product-a.jpg', 
            altText: 'Dummy Product A Image',
            width: 100, 
            height: 100  
          }
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
        product: { 
          id: 'dummy-prod-id-B',
          handle: 'dummy-product-b',
          title: 'Dummy Product B', 
          featuredImage: { 
            url: '/placeholder-product-b.jpg', 
            altText: 'Dummy Product B Image',
            width: 100,
            height: 100
          }
        }
      }
    }
  ],
  totalQuantity: 3
};


export async function createCart(): Promise<Cart> {
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log('createCart: Called in DUMMY DATA MODE. Returning standard dummy cart.');
    await new Promise(resolve => setTimeout(resolve, 50));
    return JSON.parse(JSON.stringify(DEFAULT_DUMMY_CART)); 
  }

  const res = await shopifyFetch<ShopifyCreateCartOperation>({
    query: createCartMutation
  });
  return reshapeCart(res.body.data.cartCreate.cart);
}

export async function addToCart(
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> {
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`addToCart: Called in DUMMY DATA MODE with items: ${JSON.stringify(lines)}. Returning standard dummy cart.`);
    await new Promise(resolve => setTimeout(resolve, 50));
    return JSON.parse(JSON.stringify(DEFAULT_DUMMY_CART));
  }

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
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`removeFromCart: Called in DUMMY DATA MODE with lineIds: ${JSON.stringify(lineIds)}. Returning standard dummy cart.`);
    await new Promise(resolve => setTimeout(resolve, 50));
    return JSON.parse(JSON.stringify(DEFAULT_DUMMY_CART));
  }

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
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`updateCart: Called in DUMMY DATA MODE with items: ${JSON.stringify(lines)}. Returning standard dummy cart.`);
    await new Promise(resolve => setTimeout(resolve, 50));
    return JSON.parse(JSON.stringify(DEFAULT_DUMMY_CART));
  }

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
  // This function is fully dummified or uses live data based on the env var.
  // No 'use cache' should be here if it's meant to be dummified without live fallback.
  // The previous implementation already correctly handles this.
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log('getCart called - returning dummy cart data / undefined.'); 
    await new Promise(resolve => setTimeout(resolve, 50)); 
    return JSON.parse(JSON.stringify(DEFAULT_DUMMY_CART)); 
  }

  // Original live logic for getCart
  const cartId = (await cookies()).get('cartId')?.value;
  if (!cartId) {
    return undefined;
  }
  // Assuming getCartQuery is available/re-imported if this path is ever taken.
  // For now, the import is commented out. To make this path work, it would need to be restored.
  const res = await shopifyFetch<ShopifyCartOperation>({ 
     query: /*getCartQuery*/ "", // getCartQuery import needs to be restored for this path
     variables: { cartId }
  });
  if (!res.body.data.cart) {
     return undefined;
  }
  return reshapeCart(res.body.data.cart);
}


export async function getCollection(
  handle: string
): Promise<Collection | undefined> {
  'use cache'; // MOVED TO TOP
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`getCollection: Called with handle '${handle}' in DUMMY DATA MODE.`);
    await new Promise(resolve => setTimeout(resolve, 50));
    if (handle === 'dummy-featured-collection') {
      const dummyCollection: Collection = { 
        handle: 'dummy-featured-collection', 
        title: 'Dummy Featured Collection', 
        description: 'A collection of our finest dummy featured items.', 
        seo: { 
          title: 'Dummy Featured Products', 
          description: 'Explore dummy featured products for testing.'
        }, 
        updatedAt: new Date().toISOString(), 
        path: '/search/dummy-featured-collection' 
      };
      return dummyCollection;
    }
     if (handle === 'dummy-sale-collection') { 
      const dummyCollection: Collection = { 
        handle: 'dummy-sale-collection', 
        title: 'Dummy Sale Collection', 
        description: 'Amazing dummy items on sale!', 
        seo: { 
          title: 'Dummy Sale Items', 
          description: 'Get great deals on dummy sale items.'
        }, 
        updatedAt: new Date().toISOString(), 
        path: '/search/dummy-sale-collection' 
      };
      return dummyCollection;
    }
    return undefined; 
  }

  // Live data path
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
  'use cache'; // MOVED TO TOP
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`getCollectionProducts: Called for collection '${collection}' (handle: ${collection}) in DUMMY DATA MODE.`);
    
    let dummyCollectionProductsList: Product[] = [];

    if (collection === 'dummy-featured-collection') {
      dummyCollectionProductsList = [
        {
          id: 'dummy-product-alpha',
          handle: 'dummy-product-alpha',
          availableForSale: true,
          title: 'Dummy Alpha Product (Featured)',
          description: 'This is the Alpha dummy product, specially featured. Excellent choice!',
          descriptionHtml: '<p>This is the <strong>Alpha</strong> dummy product, specially featured. Excellent choice!</p>',
          options: [{ id: 'alpha-opt-color', name: 'Color', values: ['Black', 'White'] }],
          priceRange: { maxVariantPrice: { amount: '50.00', currencyCode: 'USD' }, minVariantPrice: { amount: '40.00', currencyCode: 'USD' } },
          variants: [{ id: 'alpha-var-1', title: 'Black', availableForSale: true, selectedOptions: [{name: 'Color', value: 'Black'}], price: {amount: '40.00', currencyCode: 'USD'} }],
          featuredImage: { url: '/placeholder-alpha-featured.jpg', altText: 'Alpha Featured', width: 400, height: 400 },
          images: [{ url: '/placeholder-alpha-1.jpg', altText: 'Alpha Image 1', width: 800, height: 800 }],
          seo: { title: 'Dummy Alpha SEO', description: 'SEO for Alpha' },
          tags: ['dummy', 'alpha', 'featured'],
          updatedAt: new Date().toISOString()
        }
      ];
    } else if (collection === 'dummy-sale-collection') {
       dummyCollectionProductsList = [
        {
          id: 'dummy-product-beta-on-sale',
          handle: 'dummy-product-beta', 
          availableForSale: true, 
          title: 'Dummy Beta Product (ON SALE!)',
          description: 'This is the Beta dummy product. Get it now at a discounted price!',
          descriptionHtml: '<p>This is the <strong>Beta</strong> dummy product. Get it now at a discounted price!</p>',
          options: [{ id: 'beta-opt-finish', name: 'Finish', values: ['Matte', 'Glossy'] }],
          priceRange: { maxVariantPrice: { amount: '55.00', currencyCode: 'USD' }, minVariantPrice: { amount: '50.00', currencyCode: 'USD' } }, 
          variants: [{ id: 'beta-var-1-sale', title: 'Matte', availableForSale: true, selectedOptions: [{name: 'Finish', value: 'Matte'}], price: {amount: '50.00', currencyCode: 'USD'} }],
          featuredImage: { url: '/placeholder-beta-featured.jpg', altText: 'Beta Featured (Sale)', width: 400, height: 400 },
          images: [{ url: '/placeholder-beta-1.jpg', altText: 'Beta Image 1 (Sale)', width: 800, height: 800 }],
          seo: { title: 'Dummy Beta SEO (Sale)', description: 'SEO for Beta (Sale)' },
          tags: ['dummy', 'beta', 'sale'],
          updatedAt: new Date().toISOString()
        }
      ];
    } else {
      // Fallback to a generic list from getProducts if collection handle doesn't match.
      // This ensures getCollectionProducts always returns products in dummy mode if the collection 'exists'.
      const genericProducts = await getProducts({query: "generic"}); // Call getProducts to get its dummy list
      if (genericProducts.length > 0) {
        dummyCollectionProductsList = [genericProducts[0]]; // Take one for this collection
      } else {
        dummyCollectionProductsList = []; // Or empty if getProducts returns empty for "generic"
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 50));
    return dummyCollectionProductsList;
  }

  // Live data path
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
  'use cache'; // MOVED TO TOP
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log('getCollections: Called in DUMMY DATA MODE.');
    const dummyCollectionsList: Collection[] = [
      { 
        handle: 'dummy-featured-collection', 
        title: 'Dummy Featured Collection', 
        description: 'A collection of our finest dummy featured items.', 
        seo: { 
          title: 'Dummy Featured Products', 
          description: 'Explore dummy featured products for testing.'
        }, 
        updatedAt: new Date().toISOString(), 
        path: '/search/dummy-featured-collection' 
      },
      { 
        handle: 'dummy-sale-collection', 
        title: 'Dummy Sale Collection', 
        description: 'Amazing dummy items on sale!', 
        seo: { 
          title: 'Dummy Sale Items', 
          description: 'Get great deals on dummy sale items.'
        }, 
        updatedAt: new Date().toISOString(), 
        path: '/search/dummy-sale-collection' 
      }
    ];
    await new Promise(resolve => setTimeout(resolve, 50));
    return dummyCollectionsList;
  }

  // Live data path
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
    ...reshapeCollections(shopifyCollections).filter(
      (collection) => !collection.handle.startsWith('hidden')
    )
  ];

  return collections;
}

export async function getMenu(handle: string): Promise<Menu[]> {
  // This function is fully dummified, no 'use cache'
  console.log(`getMenu called with handle: ${handle} - returning dummy menu data.`); 

  const dummyMenu: Menu[] = [
    { title: 'Home', path: '/' },
    { title: 'All Products', path: '/search' }, 
    { title: 'T-Shirts', path: '/search/t-shirts' }, 
    { title: 'About Us', path: '/content/about-us' },
    { title: 'Contact Us', path: '/content/contact-us' },
    { title: 'Login', path: '/login' },
  ];

  await new Promise(resolve => setTimeout(resolve, 50));

  return dummyMenu;
}

export async function getPage(handle: string): Promise<Page> {
  // This function does not use 'use cache' in its original form, so no change in directive placement.
  // Dummy logic is already correctly placed.
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`getPage: Called with handle '${handle}' in DUMMY DATA MODE.`);
    const dummyPage: Page = {
      id: `dummy-page-${handle}`,
      title: `Dummy Page: ${handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      handle: handle,
      body: `<p>This is the body content for the dummy page with handle '${handle}'.</p><p>You can put <strong>HTML</strong> here.</p>`,
      bodySummary: `Summary for dummy page '${handle}'.`,
      seo: {
        title: `SEO Title for Dummy Page ${handle}`,
        description: `This is the SEO description for the dummy page with handle '${handle}'.`
      } as SEO,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    await new Promise(resolve => setTimeout(resolve, 50));
    return dummyPage;
  }

  // Original logic
  const res = await shopifyFetch<ShopifyPageOperation>({
    query: getPageQuery,
    variables: { handle }
  });

  return res.body.data.pageByHandle;
}

export async function getPages(): Promise<Page[]> {
  // This function does not use 'use cache' in its original form.
  // Dummy logic is already correctly placed.
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log('getPages: Called in DUMMY DATA MODE.');
    const dummyPagesList: Page[] = [
      { 
        id: 'dummy-page-about', 
        title: 'Dummy About Us Page', 
        handle: 'about-us', 
        body: '<p>This is the dummy About Us page content.</p>', 
        bodySummary: 'Learn more about our dummy company.', 
        seo: { title: 'Dummy About Us', description: 'Dummy About Us SEO description.' }, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      },
      { 
        id: 'dummy-page-contact', 
        title: 'Dummy Contact Page', 
        handle: 'contact-us', 
        body: '<p>Contact us via our dummy channels.</p>', 
        bodySummary: 'Get in touch with the dummy team.', 
        seo: { title: 'Dummy Contact Us', description: 'Dummy Contact Us SEO description.' }, 
        createdAt: new Date().toISOString(), 
        updatedAt: new Date().toISOString() 
      }
    ];
    await new Promise(resolve => setTimeout(resolve, 50));
    return dummyPagesList;
  }

  // Original logic
  const res = await shopifyFetch<ShopifyPagesOperation>({
    query: getPagesQuery
  });

  return removeEdgesAndNodes(res.body.data.pages);
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  'use cache'; // MOVED TO TOP
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`getProduct: Called with handle '${handle}' in DUMMY DATA MODE.`);
    
    const dummyProduct: Product = {
      id: `dummy-product-${handle}`,
      handle: handle,
      availableForSale: true,
      title: `Dummy Product ${handle.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}`,
      description: `This is a dummy description for product ${handle}. It's a fantastic product, really. You will love it.`,
      descriptionHtml: `<p>This is a <strong>dummy description</strong> for product ${handle}.</p><p>It's a fantastic product, really. You will love it.</p>`,
      options: [
        { id: 'dummy-option-color', name: 'Color', values: ['Red', 'Blue', 'Green'] },
        { id: 'dummy-option-size', name: 'Size', values: ['S', 'M', 'L', 'XL'] }
      ],
      priceRange: {
        maxVariantPrice: { amount: '100.00', currencyCode: 'USD' } as Money,
        minVariantPrice: { amount: '75.00', currencyCode: 'USD' } as Money
      },
      variants: [
        {
          id: `dummy-variant-${handle}-1`,
          title: 'Red / S',
          availableForSale: true,
          selectedOptions: [{ name: 'Color', value: 'Red' }, { name: 'Size', value: 'S' }],
          price: { amount: '75.00', currencyCode: 'USD' } as Money
        },
        {
          id: `dummy-variant-${handle}-2`,
          title: 'Blue / M',
          availableForSale: true,
          selectedOptions: [{ name: 'Color', value: 'Blue' }, { name: 'Size', value: 'M' }],
          price: { amount: '85.00', currencyCode: 'USD' } as Money
        },
        {
          id: `dummy-variant-${handle}-3`,
          title: 'Green / L',
          availableForSale: false, 
          selectedOptions: [{ name: 'Color', value: 'Green' }, { name: 'Size', value: 'L' }],
          price: { amount: '95.00', currencyCode: 'USD' } as Money
        }
      ] as ProductVariant[],
      featuredImage: {
        url: `/placeholder-product-${handle}-featured.jpg`,
        altText: `Featured image for Dummy Product ${handle}`,
        width: 600,
        height: 600
      } as Image,
      images: [
        { url: `/placeholder-product-${handle}-1.jpg`, altText: 'Image 1 for Dummy Product', width: 1024, height: 1024 },
        { url: `/placeholder-product-${handle}-2.jpg`, altText: 'Image 2 for Dummy Product', width: 1024, height: 1024 },
        { url: `/placeholder-product-${handle}-3.jpg`, altText: 'Image 3 for Dummy Product', width: 1024, height: 1024 }
      ] as Image[],
      seo: {
        title: `SEO Title for Dummy Product ${handle}`,
        description: `This is the SEO description for the dummy product with handle ${handle}.`
      },
      tags: ['dummy-data', handle, 'example-product'],
      updatedAt: new Date().toISOString()
    };
    await new Promise(resolve => setTimeout(resolve, 50)); 
    return dummyProduct;
  }

  // Live data path
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
  'use cache'; // AT THE TOP
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`getProductRecommendations: Called for productId '${productId}' in DUMMY DATA MODE. Returning empty list.`);
    await new Promise(resolve => setTimeout(resolve, 50));
    // Returning an empty list as per example, or you could return a generic list of products.
    // For simplicity and to match example, returning empty array.
    return []; 
  }

  // Live data path
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
  'use cache'; // MOVED TO TOP
  if (process.env.NEXT_PUBLIC_USE_DUMMY_DATA === 'true') {
    console.log(`getProducts: Called with query='${query}', reverse=${reverse}, sortKey='${sortKey}' in DUMMY DATA MODE.`);
    const dummyProductsList: Product[] = [
      {
        id: 'dummy-product-alpha',
        handle: 'dummy-product-alpha',
        availableForSale: true,
        title: 'Dummy Alpha Product',
        description: 'This is the Alpha dummy product. Excellent choice!',
        descriptionHtml: '<p>This is the <strong>Alpha</strong> dummy product. Excellent choice!</p>',
        options: [{ id: 'alpha-opt-color', name: 'Color', values: ['Black', 'White'] }],
        priceRange: { maxVariantPrice: { amount: '50.00', currencyCode: 'USD' }, minVariantPrice: { amount: '40.00', currencyCode: 'USD' } },
        variants: [{ id: 'alpha-var-1', title: 'Black', availableForSale: true, selectedOptions: [{name: 'Color', value: 'Black'}], price: {amount: '40.00', currencyCode: 'USD'} }],
        featuredImage: { url: '/placeholder-alpha-featured.jpg', altText: 'Alpha Featured', width: 400, height: 400 },
        images: [{ url: '/placeholder-alpha-1.jpg', altText: 'Alpha Image 1', width: 800, height: 800 }],
        seo: { title: 'Dummy Alpha SEO', description: 'SEO for Alpha' },
        tags: ['dummy', 'alpha'],
        updatedAt: new Date().toISOString()
      },
      {
        id: 'dummy-product-beta',
        handle: 'dummy-product-beta',
        availableForSale: false, 
        title: 'Dummy Beta Product',
        description: 'This is the Beta dummy product. Currently out of stock.',
        descriptionHtml: '<p>This is the <strong>Beta</strong> dummy product. Currently out of stock.</p>',
        options: [{ id: 'beta-opt-finish', name: 'Finish', values: ['Matte', 'Glossy'] }],
        priceRange: { maxVariantPrice: { amount: '65.00', currencyCode: 'USD' }, minVariantPrice: { amount: '60.00', currencyCode: 'USD' } },
        variants: [{ id: 'beta-var-1', title: 'Matte', availableForSale: false, selectedOptions: [{name: 'Finish', value: 'Matte'}], price: {amount: '60.00', currencyCode: 'USD'} }],
        featuredImage: { url: '/placeholder-beta-featured.jpg', altText: 'Beta Featured', width: 400, height: 400 },
        images: [{ url: '/placeholder-beta-1.jpg', altText: 'Beta Image 1', width: 800, height: 800 }],
        seo: { title: 'Dummy Beta SEO', description: 'SEO for Beta' },
        tags: ['dummy', 'beta', 'out-of-stock'],
        updatedAt: new Date().toISOString()
      }
    ];
    await new Promise(resolve => setTimeout(resolve, 50));
    return dummyProductsList;
  }

  // Live data path
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

export async function revalidate(req: NextRequest): Promise<NextResponse> {
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
