import { Cart } from 'lib/shopify/types';
import {
  requestCart,
  requestCategory,
  requestCategoryList,
  requestCategoryProductsCollection,
  requestCrossSell,
  requestNavigation,
  requestProductsCollection,
  requestSearchCollectionProducts,
  requestSeoUrl,
  requestSeoUrls
} from './api';
import { ExtendedCategory, ExtendedProduct, ExtendedProductListingResult } from './api-extended';
import {
  getDefaultCategoryCriteria,
  getDefaultCategoryWithCmsCriteria,
  getDefaultCrossSellingCriteria,
  getDefaultProductCriteria,
  getDefaultProductsCriteria,
  getDefaultSearchProductsCriteria,
  getSortingCriteria,
  getStaticCollectionCriteria
} from './criteria';
import {
  transformCollection,
  transformHandle,
  transformMenu,
  transformPage,
  transformProduct,
  transformProducts,
  transformStaticCollection
} from './transform';
import {
  ApiSchemas,
  Menu,
  Page,
  Product,
  ProductListingCriteria,
  StoreNavigationTypeSW
} from './types';

export async function getMenu(params?: {
  type?: StoreNavigationTypeSW;
  depth?: number;
}): Promise<Menu[]> {
  const type = params?.type || 'main-navigation';
  const depth = params?.depth || 1;
  const res = await requestNavigation(type, depth);

  return res ? transformMenu(res, type) : [];
}

export async function getPage(handle: string | []): Promise<Page | undefined> {
  const pageHandle = transformHandle(handle).replace('cms/', '');
  const seoUrlElement = await getFirstSeoUrlElement(pageHandle);
  if (seoUrlElement) {
    const resCategory = await getCategory(seoUrlElement);

    return resCategory ? transformPage(seoUrlElement, resCategory) : undefined;
  }
}

export async function getFirstSeoUrlElement(
  handle: string
): Promise<ApiSchemas['SeoUrl'] | undefined> {
  const resSeoUrl = await requestSeoUrl(handle);
  if (resSeoUrl.elements && resSeoUrl.elements.length > 0 && resSeoUrl.elements[0]) {
    return resSeoUrl.elements[0];
  }
}

export async function getFirstProduct(productId: string): Promise<ExtendedProduct | undefined> {
  const productCriteria = getDefaultProductCriteria(productId);
  const res: ExtendedProductListingResult = await requestProductsCollection(productCriteria);
  if (res.elements && res.elements.length > 0 && res.elements[0]) {
    return res.elements[0];
  }
}

// ToDo: should be more dynamic (depending on handle), should work with server and not client see generateStaticParams from next.js
export async function getStaticCollections() {
  // @ToDo: This is an example about multi-filter with new store API client
  // @ts-ignore
  const resCategory = await requestCategoryList(getStaticCollectionCriteria());

  return resCategory ? transformStaticCollection(resCategory) : [];
}

export async function getSearchCollectionProducts(params?: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
  categoryId?: string;
  defaultSearchCriteria?: Partial<ProductListingCriteria>;
}) {
  const searchQuery = params?.query ?? '';
  const criteria = getDefaultSearchProductsCriteria(searchQuery);
  const sorting = getSortingCriteria(params?.sortKey, params?.reverse);
  const searchCriteria = { ...criteria, ...sorting };

  const res = await requestSearchCollectionProducts(searchCriteria);

  return res ? transformProducts(res) : [];
}

export async function getCollectionProducts(params?: {
  collection: string;
  page?: number;
  reverse?: boolean;
  sortKey?: string;
  categoryId?: string;
  defaultSearchCriteria?: Partial<ProductListingCriteria>;
}): Promise<{ products: Product[]; total: number; limit: number }> {
  let res;
  let category = params?.categoryId;
  const collectionName = transformHandle(params?.collection ?? '');
  const sorting = getSortingCriteria(params?.sortKey, params?.reverse);

  if (!category && collectionName !== '') {
    const seoUrlElement = await getFirstSeoUrlElement(collectionName);
    if (seoUrlElement) {
      category = seoUrlElement.foreignKey;
    }
    if (!category) {
      console.log(
        '[useListing][search] Did not found any category with collection name:',
        collectionName
      );
    }
  }

  if (category) {
    const criteria = !params?.defaultSearchCriteria
      ? getDefaultProductsCriteria(params?.page)
      : params?.defaultSearchCriteria;
    const productsCriteria = { ...criteria, ...sorting };
    res = await requestCategoryProductsCollection(category, productsCriteria);
  }

  return res
    ? { products: transformProducts(res), total: res.total ?? 0, limit: res.limit ?? 0 }
    : { products: [], total: 0, limit: 0 };
}

export async function getCategory(
  seoUrl: ApiSchemas['SeoUrl'],
  cms: boolean = false
): Promise<ExtendedCategory> {
  const criteria = cms ? getDefaultCategoryWithCmsCriteria() : getDefaultCategoryCriteria();
  const resCategory = await requestCategory(seoUrl.foreignKey, criteria);

  return resCategory;
}

// This function is only used for generateMetadata at app/search/(collection)/[...collection]/page.tsx
export async function getCollection(handle: string | []) {
  const collectionName = transformHandle(handle);
  const seoUrlElement = await getFirstSeoUrlElement(collectionName);
  if (seoUrlElement) {
    const resCategory = await getCategory(seoUrlElement);
    const path = seoUrlElement.seoPathInfo ?? '';
    const collection = transformCollection(seoUrlElement, resCategory);

    return {
      ...collection,
      path: `/search/${path}`
    };
  }
}

export async function getProductSeoUrls() {
  const productSeoUrls: { path: string; updatedAt: string }[] = [];
  const res = await requestSeoUrls('frontend.detail.page');

  if (res.elements && res.elements.length > 0) {
    res.elements.map((item) =>
      productSeoUrls.push({ path: item.seoPathInfo, updatedAt: item.updatedAt ?? item.createdAt })
    );
  }

  return productSeoUrls;
}

export async function getProduct(handle: string | []): Promise<Product | undefined> {
  let productSW: ExtendedProduct | undefined;
  let productId: string | undefined;
  const productHandle = transformHandle(handle);

  const seoUrlElement = await getFirstSeoUrlElement(productHandle);
  if (seoUrlElement) {
    productId = seoUrlElement.foreignKey;
  }

  if (!productId) {
    console.log('[getProduct][search] Did not found any product with handle:', productHandle);
  }
  if (productId) {
    const firstProduct = await getFirstProduct(productId);
    if (firstProduct) {
      productSW = firstProduct;
    }
  }

  return productSW ? transformProduct(productSW) : undefined;
}

export async function getProductRecommendations(productId: string): Promise<Product[]> {
  const products: ExtendedProductListingResult = {};

  const res = await requestCrossSell(productId, getDefaultCrossSellingCriteria());
  // @ToDo: Make this more dynamic to merge multiple Cross-Sellings, at the moment we only get the first one
  if (res && res[0] && res[0].products) {
    products.elements = res[0].products;
  }

  return products ? transformProducts(products) : [];
}

export async function getCart(cartId?: string): Promise<Cart> {
  const cartData = await requestCart(cartId);

  let cart: Cart = {
    checkoutUrl: 'https://frontends-demo.vercel.app',
    cost: {
      subtotalAmount: {
        amount: cartData.price?.positionPrice?.toString() || '0',
        currencyCode: 'EUR'
      },
      totalAmount: {
        amount: cartData.price?.totalPrice?.toString() || '0',
        currencyCode: 'EUR'
      },
      totalTaxAmount: {
        amount: '0',
        currencyCode: 'EUR'
      }
    },
    id: cartData.token || '',
    lines:
      cartData.lineItems?.map((lineItem) => ({
        id: lineItem.referencedId || '',
        quantity: lineItem.quantity,
        cost: {
          totalAmount: {
            amount: (lineItem as any)?.price?.totalPrice || ''
          }
        },
        merchandise: {
          id: lineItem.referencedId,
          title: lineItem.label,
          selectedOptions: [],
          product: {
            description: lineItem.description,
            descriptionHtml: lineItem.description,
            id: lineItem.referencedId,
            images: [],
            seo: {
              description: lineItem.description,
              title: lineItem.label
            },
            availableForSale: true,
            featuredImage: {
              altText: 'Cover image of ' + lineItem.label,
              url: (lineItem as any).cover?.url
            },
            handle: '',
            options: [],
            variants: [],
            priceRange: {},
            tags: [],
            title: lineItem.label,
            updatedAt: (lineItem as any)?.payload?.updatedAt
          }
        }
      })) || [],
    totalQuantity: cartData.lineItems?.length || 0
  };

  return cart;
}
