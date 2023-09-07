import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';
import { TAGS } from 'lib/constants';
import {
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
  getSeoUrlCriteria,
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
  CategoryListingResultSW,
  Menu,
  Page,
  Product,
  ProductListingCriteria,
  StoreNavigationTypeSW
} from './types';
import { isSeoUrls } from 'lib/shopware/helpers';

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

  if (isSeoUrls()) {
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
  const seoURLCriteria = getSeoUrlCriteria(handle);
  const seoURL = await requestSeoUrl(seoURLCriteria);
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

  if (isSeoUrls()) {
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
  if (isSeoUrls() && search) {
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

  if (isSeoUrls() && !category && collectionName !== '') {
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

  if (!isSeoUrls()) {
    category = collectionName ?? undefined;
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

  if (isSeoUrls()) {
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

  if (isSeoUrls()) {
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

// This is called from `app/api/revalidate.ts` so providers can control revalidation logic.
export async function revalidate(req: NextRequest): Promise<NextResponse> {
  return NextResponse.json({
    status: 200,
    message: 'This is currently not working and was never tested.',
    now: Date.now()
  });
  // We always need to respond with a 200 status code,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = ['collections/create', 'collections/delete', 'collections/update'];
  const productWebhooks = ['products/create', 'products/delete', 'products/update'];
  const topic = headers().get('x-shopware-topic') || 'unknown';
  const secret = req.nextUrl.searchParams.get('secret');
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.SHOPWARE_REVALIDATION_SECRET) {
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
