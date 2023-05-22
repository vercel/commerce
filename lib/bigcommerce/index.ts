import { isVercelCommerceError } from 'lib/type-guards';
import { BIGCOMMERCE_GRAPHQL_API_ENDPOINT } from './constants';
import {
  bigCommerceToVercelCollection,
  bigcommerceToVercelCart,
  bigcommerceToVercelProduct,
  bigcommerceToVercelProducts,
  vercelFromBigCommerceLineItems
} from './mappers';
import {
  addCartLineItemMutation,
  createCartMutation,
  deleteCartLineItemMutation,
  updateCartLineItemMutation
} from './mutations/cart';
import { getCartQuery } from './queries/cart';
import { getCategoryQuery, getStoreCategoriesQuery } from './queries/category';
import { getCheckoutQuery } from './queries/checkout';
import { getMenuQuery } from './queries/menu';
import { fetchStorefrontToken } from './storefront-config';
// import { getPageQuery, getPagesQuery } from './queries/page'; TODO: replace on BC Webpage API
import {
  getProductQuery,
  getProductsCollectionQuery,
  getProductsRecommedationsQuery,
  searchProductsQuery
} from './queries/product';
import { getEntityIdByRouteQuery } from './queries/route';
import {
  BigCommerceAddToCartOperation,
  BigCommerceCart,
  BigCommerceCartOperation,
  BigCommerceCategoryTreeItem,
  BigCommerceCheckoutOperation,
  BigCommerceCollectionOperation,
  BigCommerceCollectionsOperation,
  BigCommerceCreateCartOperation,
  BigCommerceDeleteCartItemOperation,
  BigCommerceEntityIdOperation,
  BigCommerceMenuOperation,
  BigCommerceProductOperation,
  BigCommerceProductsCollectionOperation,
  BigCommerceRecommendationsOperation,
  BigCommerceSearchProductsOperation,
  BigCommerceUpdateCartItemOperation,
  VercelCart,
  VercelCollection,
  VercelMenu,
  VercelProduct
} from './types';

const domain = `https://store-${process.env.BIGCOMMERCE_STORE_HASH!}${process.env
  .BIGCOMMERCE_CHANNEL_ID!}`;
const endpoint = `${domain}.${BIGCOMMERCE_GRAPHQL_API_ENDPOINT}`;

type ExtractVariables<T> = T extends { variables: object } ? T['variables'] : never;

const getEntityIdByHandle = async (entityHandle: string) => {
  const res = await bigcommerceFetch<BigCommerceEntityIdOperation>({
    query: getEntityIdByRouteQuery,
    variables: {
      path: `/${entityHandle}`
    }
  });

  return res.body.data.site.route.node.entityId;
};

export async function bigcommerceFetch<T>({
  query,
  variables,
  headers,
  cache = 'force-cache'
}: {
  query: string;
  variables?: ExtractVariables<T>;
  headers?: HeadersInit;
  cache?: RequestCache;
}): Promise<{ status: number; body: T } | never> {
  try {
    const {
      data: { token }
    } = await fetchStorefrontToken();

    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        ...headers
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...(variables && { variables })
      }),
      cache,
      next: { revalidate: 900 } // 15 minutes
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
    if (isVercelCommerceError(e)) {
      throw {
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

const getBigCommerceProductsWithCheckout = async (
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
) => {
  const bigCommerceProducts = await Promise.all(
    lines.map(async ({ merchandiseId }) => {
      const productId = Number(merchandiseId);

      const resp = await bigcommerceFetch<BigCommerceProductOperation>({
        query: getProductQuery,
        variables: {
          productId
        },
        cache: 'no-store'
      });

      return {
        productId,
        productData: resp.body.data.site.product
      };
    })
  );

  const resCheckout = await bigcommerceFetch<BigCommerceCheckoutOperation>({
    query: getCheckoutQuery,
    variables: {
      entityId: cartId
    },
    cache: 'no-store'
  });

  return {
    productsByIdList: bigCommerceProducts,
    checkout: resCheckout.body.data.site.checkout
  };
};

export async function createCart(): Promise<VercelCart> {
  // NOTE: on BigCommerce side we can't create cart
  // w/t item params as quantity, productEntityId
  return {
    id: '',
    checkoutUrl: '',
    cost: {
      subtotalAmount: {
        amount: '',
        currencyCode: ''
      },
      totalAmount: {
        amount: '',
        currencyCode: ''
      },
      totalTaxAmount: {
        amount: '',
        currencyCode: ''
      }
    },
    lines: [],
    totalQuantity: 0
  };
}

export async function addToCart(
  cartId: string,
  lines: { merchandiseId: string; quantity: number }[]
): Promise<VercelCart> {
  let bigCommerceCart: BigCommerceCart;

  if (cartId) {
    const res = await bigcommerceFetch<BigCommerceAddToCartOperation>({
      query: addCartLineItemMutation,
      variables: {
        addCartLineItemsInput: {
          cartEntityId: cartId,
          data: {
            lineItems: lines.map(({ merchandiseId, quantity }) => ({
              productEntityId: parseInt(merchandiseId, 10),
              quantity
            }))
          }
        }
      },
      cache: 'no-store'
    });

    bigCommerceCart = res.body.data.cart.addCartLineItems.cart;
  } else {
    const res = await bigcommerceFetch<BigCommerceCreateCartOperation>({
      query: createCartMutation,
      variables: {
        createCartInput: {
          lineItems: lines.map(({ merchandiseId, quantity }) => ({
            productEntityId: parseInt(merchandiseId, 10),
            quantity
          }))
        }
      },
      cache: 'no-store'
    });

    bigCommerceCart = res.body.data.cart.createCart.cart;
  }

  const { productsByIdList, checkout } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigcommerceToVercelCart(bigCommerceCart, productsByIdList, checkout);
}

export async function removeFromCart(cartId: string, lineIds: string[]): Promise<VercelCart> {
  let cartState: { status: number; body: BigCommerceDeleteCartItemOperation };

  for (let removals = lineIds.length; removals > 0; removals--) {
    const lineId = lineIds[removals - 1]!;

    const res = await bigcommerceFetch<BigCommerceDeleteCartItemOperation>({
      query: deleteCartLineItemMutation,
      variables: {
        deleteCartLineItemInput: {
          cartEntityId: cartId,
          lineItemEntityId: lineId
        }
      },
      cache: 'no-store'
    });

    cartState = res;
  }

  const cart = cartState!.body.data.cart.deleteCartLineItem.cart;
  const lines = vercelFromBigCommerceLineItems(cart.lineItems);
  const { productsByIdList, checkout } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigcommerceToVercelCart(cart, productsByIdList, checkout);
}

// NOTE: looks like we can update only product-level update.
// Update on selected options requires variantEntityId, optionEntityId
export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[]
): Promise<VercelCart> {
  let cartState: { status: number; body: BigCommerceUpdateCartItemOperation } | undefined;

  for (let updates = lines.length; updates > 0; updates--) {
    const { id, merchandiseId, quantity } = lines[updates - 1]!;
    const res = await bigcommerceFetch<BigCommerceUpdateCartItemOperation>({
      query: updateCartLineItemMutation,
      variables: {
        updateCartLineItemInput: {
          cartEntityId: cartId,
          lineItemEntityId: id,
          data: {
            lineItem: {
              quantity,
              productEntityId: Number(merchandiseId)
            }
          }
        }
      },
      cache: 'no-store'
    });

    cartState = res;
  }

  const updatedCart = cartState!.body.data.cart.updateCartLineItem.cart;
  const { productsByIdList, checkout } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigcommerceToVercelCart(updatedCart, productsByIdList, checkout);
}

// NOTE: DONE & review if it works
export async function getCart(cartId: string): Promise<VercelCart | null> {
  const res = await bigcommerceFetch<BigCommerceCartOperation>({
    query: getCartQuery,
    variables: { entityId: cartId },
    cache: 'no-store'
  });

  if (!res.body.data.site.cart) {
    return null;
  }

  const cart = res.body.data.site.cart;
  const lines = vercelFromBigCommerceLineItems(cart.lineItems);
  const { productsByIdList, checkout } = await getBigCommerceProductsWithCheckout(cartId, lines);

  return bigcommerceToVercelCart(cart, productsByIdList, checkout);
}

export async function getCollection(handle: string): Promise<VercelCollection> {
  const entityId = await getEntityIdByHandle(handle); // NOTE: check if this approach suits us

  const res = await bigcommerceFetch<BigCommerceCollectionOperation>({
    query: getCategoryQuery,
    variables: {
      entityId
    }
  });

  return bigCommerceToVercelCollection(res.body.data.site.category);
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<VercelProduct[]> {
  const collectionId = await getEntityIdByHandle(collection); // NOTE: check if this approach suits us
  const res = await bigcommerceFetch<BigCommerceProductsCollectionOperation>({
    query: getProductsCollectionQuery,
    variables: {
      entityId: collectionId,
      first: 100,
      hideOutOfStock: false,
      sortBy: sortKey || null
    }
  });

  if (!res.body.data.site.category) {
    console.log(`No collection found for \`${collection}\``);
    return [];
  }
  const productList = res.body.data.site.category.products.edges.map((item) => item.node);

  return bigcommerceToVercelProducts(productList);
}

export async function getCollections(): Promise<VercelCollection[]> {
  const res = await bigcommerceFetch<BigCommerceCollectionsOperation>({
    query: getStoreCategoriesQuery
  });
  const collectionIdList = res.body.data.site.categoryTree.map(({ entityId }) => entityId);

  const collections = await Promise.all(
    collectionIdList.map(async (entityId) => {
      const res = await bigcommerceFetch<BigCommerceCollectionOperation>({
        query: getCategoryQuery,
        variables: {
          entityId
        }
      });
      return bigCommerceToVercelCollection(res.body.data.site.category);
    })
  );

  return collections;
}

export async function getMenu(handle: string): Promise<VercelMenu[]> {
  const expectedMenyType = 'footerOrHeader';
  const handleToSlug: Record<string, string> = {
    'next-js-frontend-footer-menu': expectedMenyType,
    'next-js-frontend-header-menu': expectedMenyType
  };
  const configureMenuPath = (path: string) =>
    path
      .split('/')
      .filter((item) => item.length)
      .pop();
  const createVercelCollectionPath = (title: string) => `/search/${title}`;
  const configureVercelMenu = (
    menuData: BigCommerceCategoryTreeItem[],
    isMenuData: boolean
  ): VercelMenu[] => {
    if (isMenuData) {
      return menuData.flatMap((item) => {
        const { name, path, hasChildren, children } = item;
        const verceLTitle = configureMenuPath(path);

        const vercelMenuItem = {
          title: name,
          path: createVercelCollectionPath(verceLTitle!)
        };

        if (hasChildren && children) {
          return configureVercelMenu(children, hasChildren);
        }

        return [vercelMenuItem];
      });
    }

    return [];
  };

  if (handleToSlug[handle] === expectedMenyType) {
    const res = await bigcommerceFetch<BigCommerceMenuOperation>({
      query: getMenuQuery
    });

    return configureVercelMenu(res.body.data.site.categoryTree, true);
  }

  return [];
}

// TODO: replace with BC API  next Page(s) Methods
// export async function getPage(handle: string): Promise<VercelPage> {
//   const res = await bigcommerceFetch<ShopifyPageOperation>({
//     query: getPageQuery,
//     variables: { handle }
//   });

//   return res.body.data.pageByHandle;
// }

// export async function getPages(): Promise<VercelPage[]> {
//   const res = await bigcommerceFetch<ShopifyPagesOperation>({
//     query: getPagesQuery
//   });

//   return removeEdgesAndNodes(res.body.data.pages);
// }

export async function getProduct(handle: string): Promise<VercelProduct | undefined> {
  const productId = await getEntityIdByHandle(handle); // NOTE: check of this approach work
  const res = await bigcommerceFetch<BigCommerceProductOperation>({
    query: getProductQuery,
    variables: {
      productId
    }
  });

  return bigcommerceToVercelProduct(res.body.data.site.product);
}

export async function getProductRecommendations(productId: string): Promise<VercelProduct[]> {
  const res = await bigcommerceFetch<BigCommerceRecommendationsOperation>({
    query: getProductsRecommedationsQuery,
    variables: {
      entityId: parseInt(productId, 10)
    }
  });

  const productList = res.body.data.site.product.relatedProducts.edges.map((item) => item.node);

  return bigcommerceToVercelProducts(productList);
}

export async function getProducts({
  query,
  reverse,
  sortKey
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<VercelProduct[]> {
  const res = await bigcommerceFetch<BigCommerceSearchProductsOperation>({
    query: searchProductsQuery,
    variables: {
      searchProductsSortInput: {
        filters: {
          searchTerm: query || ''
        },
        sort: sortKey || null
      }
    }
  });

  const productList = res.body.data.site.search.searchProducts.products.edges.map(
    (item) => item.node
  );

  return bigcommerceToVercelProducts(productList);
}
