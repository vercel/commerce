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
const useSeoUrls = `${process.env.SHOPWARE_USE_SEO_URLS}` === 'true';

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
  let seoUrlElement;
  let pageIdOrHandle = decodeURIComponent(transformHandle(handle)).replace('cms/', '');

  if (useSeoUrls) {
    seoUrlElement = await getFirstSeoUrlElement(pageIdOrHandle);
    if (seoUrlElement) {
      pageIdOrHandle = seoUrlElement.foreignKey;
    }

    if (!seoUrlElement) {
      console.log('[getPage] Did not found any seoUrl element with page handle:', pageIdOrHandle);
    }
  }

  const category = await getCategory(pageIdOrHandle);
  if (!category) {
    console.log('[getPage] Did not found any category with handle:', pageIdOrHandle);
  }

  return category ? transformPage(category, seoUrlElement) : undefined;
}

export async function getFirstSeoUrlElement(
  handle: string
): Promise<ApiSchemas['SeoUrl'] | undefined> {
  const seoURL = await requestSeoUrl(handle);
  if (seoURL && seoURL.elements && seoURL.elements.length > 0 && seoURL.elements[0]) {
    return seoURL.elements[0];
  }
}

export async function getFirstProduct(productId: string): Promise<ExtendedProduct | undefined> {
  const productCriteria = getDefaultProductCriteria(productId);
  const listing: ExtendedProductListingResult | undefined = await requestProductsCollection(
    productCriteria
  );
  if (listing && listing.elements && listing.elements.length > 0 && listing.elements[0]) {
    return listing.elements[0];
  }
}

// ToDo: should be more dynamic (depending on handle), should work with server and not client see generateStaticParams from next.js
export async function getSubCollections(collection: string) {
  const collectionName = decodeURIComponent(transformHandle(collection ?? ''));
  let criteria = getDefaultSubCategoriesCriteria(collectionName);
  let res: CategoryListingResultSW | undefined = undefined;
  const parentCollectionName =
    Array.isArray(collection) && collection[0] ? collection[0] : undefined;

  if (useSeoUrls) {
    const seoUrlElement = await getFirstSeoUrlElement(collectionName);
    if (seoUrlElement) {
      criteria = getDefaultSubCategoriesCriteria(seoUrlElement.foreignKey);
    }
  }

  // @ts-ignore
  res = await requestCategoryList(criteria);

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

  const search = await requestSearchCollectionProducts(searchCriteria);
  if (search) {
    search.elements = await changeVariantUrlToParentUrl(search);
  }

  return search ? transformProducts(search) : [];
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
  let products;
  let category = params?.categoryId;
  const collectionName = decodeURIComponent(transformHandle(params?.collection ?? ''));
  const sorting = getSortingCriteria(params?.sortKey, params?.reverse);

  if (useSeoUrls && !category && collectionName !== '') {
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

  if (!useSeoUrls) {
    category = params?.collection ?? undefined;
  }

  if (category) {
    const criteria = !params?.defaultSearchCriteria
      ? getDefaultProductsCriteria(params?.page)
      : params?.defaultSearchCriteria;
    const productsCriteria = { ...criteria, ...sorting };
    products = await requestCategoryProductsCollection(category, productsCriteria);
    if (products) {
      products.elements = await changeVariantUrlToParentUrl(products);
    }
  }

  return products
    ? {
        products: transformProducts(products),
        total: products.total ?? 0,
        limit: products.limit ?? 0
      }
    : { products: [], total: 0, limit: 0 };
}

export async function getCategory(
  categoryId: string,
  cms: boolean = false
): Promise<ExtendedCategory | undefined> {
  const criteria = cms ? getDefaultCategoryWithCmsCriteria() : getDefaultCategoryCriteria();
  return await requestCategory(categoryId, criteria);
}

// This function is only used for generateMetadata at app/search/(collection)/[...collection]/page.tsx
export async function getCollection(handle: string | []) {
  let path;
  let seoUrlElement;
  let categoryIdOrHandle = decodeURIComponent(transformHandle(handle));

  if (useSeoUrls) {
    seoUrlElement = await getFirstSeoUrlElement(categoryIdOrHandle);
    if (seoUrlElement) {
      categoryIdOrHandle = seoUrlElement.foreignKey;
      path = seoUrlElement.seoPathInfo ?? '';
    }
  }

  const category = await getCategory(categoryIdOrHandle);
  if (category) {
    const collection = transformCollection(category, seoUrlElement);
    path = path ?? category.id ?? '';

    return {
      ...collection,
      path: `/search/${path}`
    };
  }
}

export async function getProductSeoUrls() {
  const productSeoUrls: { path: string; updatedAt: string }[] = [];
  const seoUrls = await requestSeoUrls('frontend.detail.page');

  if (seoUrls && seoUrls.elements && seoUrls.elements.length > 0) {
    seoUrls.elements.map((item) =>
      productSeoUrls.push({ path: item.seoPathInfo, updatedAt: item.updatedAt ?? item.createdAt })
    );
  }

  return productSeoUrls;
}

export async function getProduct(handle: string | []): Promise<Product | undefined> {
  let productSW: ExtendedProduct | undefined;
  let productId: string | undefined;
  const productHandle = decodeURIComponent(transformHandle(handle));
  productId = productHandle; // if we do not use seoUrls the handle should be the product id

  if (useSeoUrls) {
    const seoUrlElement = await getFirstSeoUrlElement(productHandle);
    if (seoUrlElement) {
      productId = seoUrlElement.foreignKey;
    }
  }

  if (!productId) {
    console.log('[getProduct][search] Did not found any product with handle:', handle);
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

export async function getCart(): Promise<Cart | undefined> {
  const cartData = await requestCart();
  if (cartData) {
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
          id: lineItem.referencedId || '',
          quantity: lineItem.quantity ?? 0,
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
}
