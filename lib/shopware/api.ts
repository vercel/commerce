import { createAPIClient } from '@shopware/api-client';
import { operations, operationPaths } from './api-types/apiTypes-6.5.2.0';
import {
  ApiSchemas,
  CategoryListingResultSW,
  ProductListingCriteria,
  SeoURLResultSW,
  StoreNavigationTypeSW
} from './types';

const domainSW = `https://${process.env.SHOPWARE_STORE_DOMAIN!}/${process.env.SHOPWARE_API_TYPE!}`;
const accessTokenSW = `${process.env.SHOPWARE_ACCESS_TOKEN}`;

const apiInstance = createAPIClient<operations, operationPaths>({
  baseURL: domainSW,
  accessToken: accessTokenSW,
  apiType: 'store-api'
});

export async function requestNavigation(
  type: StoreNavigationTypeSW,
  depth: number
): Promise<ApiSchemas['NavigationRouteResponse']> {
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
): Promise<ApiSchemas['Category']> {
  return await apiInstance.invoke('readCategory post /category/{navigationId}?slots', {
    navigationId: categoryId,
    criteria
  });
}

export async function requestCategoryList(
  criteria: Partial<ApiSchemas['Criteria']>
): Promise<CategoryListingResultSW> {
  return await apiInstance.invoke('readCategoryList post /category', criteria);
}

export async function requestProductsCollection(
  criteria: Partial<ProductListingCriteria>
): Promise<ApiSchemas['ProductListingResult']> {
  return await apiInstance.invoke('readProduct post /product', criteria);
}

export async function requestCategoryProductsCollection(
  categoryId: string,
  criteria: Partial<ProductListingCriteria>
): Promise<ApiSchemas['ProductListingResult']> {
  return await apiInstance.invoke('readProductListing post /product-listing/{categoryId}', {
    ...criteria,
    categoryId: categoryId
  });
}

export async function requestSearchCollectionProducts(
  criteria?: Partial<ProductListingCriteria>
): Promise<ApiSchemas['ProductListingResult']> {
  return await apiInstance.invoke('searchPage post /search', {
    search: encodeURIComponent(criteria?.query || ''),
    ...criteria
  });
}

export async function requestSeoUrl(handle: string): Promise<SeoURLResultSW> {
  return await apiInstance.invoke('readSeoUrl post /seo-url', {
    page: 1,
    limit: 1,
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
): Promise<ApiSchemas['CrossSellingElementCollection']> {
  return await apiInstance.invoke(
    'readProductCrossSellings post /product/{productId}/cross-selling',
    {
      productId: productId,
      ...criteria
    }
  );
}
