// @ts-ignore
import {
  mockMoney,
  mockImage,
  mockProductOption,
  mockProductVariant,
  mockShopifyProduct,
  mockCartItem,
  mockShopifyCart,
  winterCollection,
  summerCollection,
  europeCollection,
  mockPage,
  collections
} from './mock';
import {
  Cart,
  Collection,
  Connection,
  Image,
  Menu,
  Page,
  Product,
  ShopifyCart,
  ShopifyCollection,
  ShopifyCollectionsOperation,
  ShopifyProduct
} from './types';
import { getCollectionsQuery } from './queries/collection';
import { TAGS } from '../constants';
import { shopifyFetch } from './index_old';
import { adventureProductNodes, getProductByHandle, getProductNodesByKeyword } from './adventures';

const HIDDEN_PRODUCT_TAG = 'hidden';

// Helper function to simulate a fetch response
// @ts-ignore
const mockFetchResponse = (data) => ({
  body: {
    data
  }
});

// @ts-ignore
const removeEdgesAndNodes = (connection) => {
  if (!connection?.edges) {
    return connection;
  }

  return connection?.edges ? connection?.edges.map((edge: any) => edge.node) : [];
};

export const createCart = async (): Promise<Cart> => {
  const res = mockFetchResponse({
    cartCreate: {
      cart: mockShopifyCart
    }
  });
  return reshapeCart(res.body.data.cartCreate.cart);
};

export const addToCart = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<Cart> => {
  const res = mockFetchResponse({
    cartLinesAdd: {
      cart: mockShopifyCart
    }
  });
  return reshapeCart(res.body.data.cartLinesAdd.cart);
};

export const removeFromCart = async (cartId: string, lineIds: string[]): Promise<Cart> => {
  const res = mockFetchResponse({
    cartLinesRemove: {
      cart: mockShopifyCart
    }
  });
  return reshapeCart(res.body.data.cartLinesRemove.cart);
};

export const updateCart = async (
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<Cart> => {
  const res = mockFetchResponse({
    cartLinesUpdate: {
      cart: mockShopifyCart
    }
  });
  return reshapeCart(res.body.data.cartLinesUpdate.cart);
};

export const getCart = async (cartId: string): Promise<Cart | undefined> => {
  const res = mockFetchResponse({
    cart: mockShopifyCart
  });
  return reshapeCart(res.body.data.cart);
};

export const getCollection = async (handle: string): Promise<Collection | undefined> => {
  const res = mockFetchResponse({
    collection: collections.find((collection) => collection.handle === handle)
  });
  return reshapeCollection(res.body.data.collection);
};

export const getCollectionProducts = async ({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> => {
  const res = mockFetchResponse({
    collection: {
      products: {
        edges: getProductNodesByKeyword(collection)
      }
    }
  });
  return reshapeProducts(removeEdgesAndNodes(res.body.data.collection.products));
};

export async function getCollections(): Promise<Collection[]> {
  // const res = await shopifyFetch<ShopifyCollectionsOperation>({
  //     query: getCollectionsQuery,
  //     tags: [TAGS.collections]
  // });
  const res = mockFetchResponse({
    collections: {
      edges: [{ node: winterCollection }, { node: summerCollection }, { node: europeCollection }]
    }
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
      path: '/search/',
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

export const getMenu = async (handle: string): Promise<Menu[]> => {
  const res = mockFetchResponse({
    menu: {
      items: [
        {
          title: 'All',
          path: '/'
        },
        {
          title: 'Summer',
          path: '/search/summer-collection'
        },
        {
          title: 'Winter',
          path: '/search/winter-collection'
        },
        {
          title: 'Europe',
          path: '/search/europe-collection'
        }
      ]
    }
  });
  return res.body.data.menu.items;
};

export const getPage = async (handle: string): Promise<Page> => {
  const res = mockFetchResponse({
    pageByHandle: mockPage
  });
  return res.body.data.pageByHandle;
};

export const getPages = async (): Promise<Page[]> => {
  const res = mockFetchResponse({
    pages: {
      edges: [{ node: mockPage }]
    }
  });
  return removeEdgesAndNodes(res.body.data.pages);
};

export const getProduct = async (handle: string): Promise<Product | undefined> => {
  const res = mockFetchResponse({
    product: getProductByHandle(handle)
  });
  return reshapeProduct(res.body.data.product, false);
};

export const getProductRecommendations = async (productId: string): Promise<Product[]> => {
  const res = mockFetchResponse({
    productRecommendations: [
      getProductByHandle('climbing-new-zealand'),
      getProductByHandle('ski-touring-mont-blanc'),
      getProductByHandle('downhill-skiing-wyoming'),
      getProductByHandle('cycling-tuscany')
    ]
  });
  return reshapeProducts(res.body.data.productRecommendations);
};

export const getProducts = async ({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> => {
  const res = mockFetchResponse({
    products: {
      edges: getProductNodesByKeyword(query)
    }
  });
  return reshapeProducts(removeEdgesAndNodes(res.body.data.products));
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

const reshapeImages = (images: Connection<Image>, productTitle: string) => {
  const flattened = removeEdgesAndNodes(images);

  // @ts-ignore
  return flattened.map((image) => {
    const filename = image.url.match(/.*\/(.*)\..*/)[1];
    return {
      ...image,
      altText: image.altText || `${productTitle} - ${filename}`
    };
  });
};

const reshapeProduct = (product: ShopifyProduct, filterHiddenProducts: boolean = true) => {
  // if (!product || (filterHiddenProducts && product.tags.includes(HIDDEN_PRODUCT_TAG))) {
  if (!product) {
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
