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
getDefaultSubCategoriesCriteria,
getSortingCriteria
} from './criteria';
import {
transformCollection,
transformHandle,
transformMenu,
transformPage,
transformProduct,
transformProducts,
transformSubCollection
} from './transform';
import {
ApiSchemas,
Cart,
CategoryListingResultSW,
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
    const category = await getCategory(seoUrlElement);

    if (!category) {
      console.log('[getPage] Did not found any category with page handle:', pageHandle);
    }

    return category ? transformPage(seoUrlElement, category) : undefined;
  }

  if (!seoUrlElement) {
    console.log('[getPage] Did not found any seoUrl element with page handle:', pageHandle);
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
export async function getSubCollections(collection: string) {
  let res: CategoryListingResultSW | undefined = undefined;
  const parentCollectionName =
    Array.isArray(collection) && collection[0] ? collection[0] : undefined;
  const collectionName = transformHandle(collection ?? '');
  const seoUrlElement = await getFirstSeoUrlElement(collectionName);
  if (seoUrlElement) {
    const criteria = getDefaultSubCategoriesCriteria(seoUrlElement.foreignKey);
    // @ts-ignore
    res = await requestCategoryList(criteria);
  }

  return res ? transformSubCollection(res, parentCollectionName) : [];
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
  res.elements = await changeVariantUrlToParentUrl(res);

  return res ? transformProducts(res) : [];
}

export async function changeVariantUrlToParentUrl(
  collection: ExtendedProductListingResult
): Promise<ExtendedProduct[]> {
  const newElements: ExtendedProduct[] = [];
  if (collection.elements && collection.elements.length > 0) {
    await Promise.all(
      collection.elements.map(async (item) => {
        if (item.parentId && item.seoUrls && item.seoUrls[0]) {
          const parentProduct = await getFirstProduct(item.parentId);
          if (parentProduct && parentProduct.seoUrls && parentProduct.seoUrls[0]) {
            item.seoUrls[0].seoPathInfo = parentProduct.seoUrls[0].seoPathInfo;
          }
        }

        newElements.push(item);
      })
    );
  }

  return newElements;
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
    res.elements = await changeVariantUrlToParentUrl(res);
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

export async function getCart(): Promise<Cart> {
  const cartData = await requestCart();

  // @ToDo: should be moved to transformCart function
  const cart: Cart = {
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
        id: lineItem.id || '',
        quantity: lineItem.quantity ?? 0,
        id: lineItem.referencedId || '',
        cost: {
          totalAmount: {
            amount: (lineItem as any)?.price?.totalPrice || '',
            currencyCode: 'EUR'
          }
        },
        merchandise: {
          id: lineItem.referencedId ?? '',
          title: lineItem.label ?? '',
          selectedOptions: [],
          product: {
            description: lineItem.description ?? '',
            descriptionHtml: lineItem.description ?? '',
            id: lineItem.referencedId ?? '',
            images: [],
            path: '',
            seo: {
              description: lineItem.description ?? '',
              title: lineItem.label ?? ''
            },
            availableForSale: true,
            featuredImage: (lineItem as any).cover?.url,
            handle: '',
            options: [],
            variants: [],
            priceRange: {
              minVariantPrice: {
                amount: '', // @ToDo: should be correct value
                currencyCode: 'EUR'
              },
              maxVariantPrice: {
                amount: '', // @ToDo: should be correct value
                currencyCode: 'EUR'
              }
            },
            tags: [],
            title: lineItem.label ?? '',
            updatedAt: (lineItem as any)?.payload?.updatedAt
          }
        }
      })) || [],
    totalQuantity: cartData.lineItems?.length || 0
  };

  return cart;
}
