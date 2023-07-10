import { createAPIClient, RequestReturnType } from '@shopware/api-client';
import { operations } from '@shopware/api-client/api-types';
import {
  ExtendedCategory,
  ExtendedCriteria,
  ExtendedCrossSellingElementCollection,
  ExtendedProductListingResult,
  extendedOperations,
  extendedPaths
} from './api-extended';
import {
  CategoryListingResultSW,
  ProductListingCriteria,
  RouteNames,
  SeoURLResultSW,
  StoreNavigationTypeSW
} from './types';

const domainSW = `https://${process.env.SHOPWARE_STORE_DOMAIN!}/${process.env.SHOPWARE_API_TYPE!}`;
const accessTokenSW = `${process.env.SHOPWARE_ACCESS_TOKEN}`;

const apiInstance = createAPIClient<extendedOperations, extendedPaths>({
  baseURL: domainSW,
  accessToken: accessTokenSW,
  apiType: 'store-api'
});

// reimport operations return types to use it in application
export type ApiReturnType<OPERATION_NAME extends keyof operations> = RequestReturnType<
  OPERATION_NAME,
  operations
>;

export async function requestNavigation(
  type: StoreNavigationTypeSW,
  depth: number
): Promise<ExtendedCategory[]> {
  return await apiInstance.invoke(
    'readNavigation post /navigation/{activeId}/{rootId} sw-include-seo-urls',
    {
      activeId: type,
      rootId: type,
      depth: depth
    }
  );
}

export async function requestCategory(
  categoryId: string,
  criteria?: Partial<ProductListingCriteria>
): Promise<ExtendedCategory> {
  return await apiInstance.invoke('readCategory post /category/{navigationId}?slots', {
    navigationId: categoryId,
    criteria
  });
}

export async function requestCategoryList(
  criteria: Partial<ExtendedCriteria>
): Promise<CategoryListingResultSW> {
  return await apiInstance.invoke('readCategoryList post /category', criteria);
}

export async function requestProductsCollection(
  criteria: Partial<ProductListingCriteria>
): Promise<ExtendedProductListingResult> {
  return await apiInstance.invoke('readProduct post /product', criteria);
}

export async function requestCategoryProductsCollection(
  categoryId: string,
  criteria: Partial<ProductListingCriteria>
): Promise<ExtendedProductListingResult> {
  return await apiInstance.invoke('readProductListing post /product-listing/{categoryId}', {
    ...criteria,
    categoryId: categoryId
  });
}

export async function requestSearchCollectionProducts(
  criteria?: Partial<ProductListingCriteria>
): Promise<ExtendedProductListingResult> {
  return await apiInstance.invoke('searchPage post /search', {
    search: encodeURIComponent(criteria?.query || ''),
    ...criteria
  });
}

export async function requestSeoUrls(routeName: RouteNames, page: number = 1, limit: number = 100) {
  return await apiInstance.invoke('readSeoUrl post /seo-url', {
    page: page,
    limit: limit,
    filter: [
      {
        type: 'equals',
        field: 'routeName',
        value: routeName
      }
    ]
  });
}

export async function requestSeoUrl(
  handle: string,
  page: number = 1,
  limit: number = 1
): Promise<SeoURLResultSW> {
  return await apiInstance.invoke('readSeoUrl post /seo-url', {
    page: page,
    limit: limit,
    filter: [
      {
        type: 'multi',
        // @ts-ignore
        operator: 'or',
        queries: [
          {
            type: 'equals',
            field: 'seoPathInfo',
            value: handle + '/'
          },
          {
            type: 'equals',
            field: 'seoPathInfo',
            value: handle
          }
        ]
      }
    ]
  });
}

export async function requestCrossSell(
  productId: string,
  criteria?: Partial<ProductListingCriteria>
): Promise<ExtendedCrossSellingElementCollection> {
  return await apiInstance.invoke(
    'readProductCrossSellings post /product/{productId}/cross-selling',
    {
      productId: productId,
      ...criteria
    }
  );
}
