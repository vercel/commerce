import { createAPIClient, RequestReturnType, ApiClientError } from '@shopware/api-client';
import { operations } from '@shopware/api-client/api-types';
import {
  ExtendedCategory,
  ExtendedCriteria,
  ExtendedCrossSellingElementCollection,
  extendedOperations,
  extendedPaths,
  ExtendedProductListingResult
} from './api-extended';
import {
  CategoryListingResultSW,
  ProductListingCriteria,
  RouteNames,
  SeoURLResultSW,
  StoreNavigationTypeSW
} from './types';
import { getStoreDomainWithApiType, getAccessToken, getApiType } from 'lib/shopware/helpers';

const apiInstance = createAPIClient<extendedOperations, extendedPaths>({
  baseURL: getStoreDomainWithApiType(),
  accessToken: getAccessToken(),
  apiType: getApiType()
});

// reimport operations return types to use it in application
export type ApiReturnType<OPERATION_NAME extends keyof operations> = RequestReturnType<
  OPERATION_NAME,
  operations
>;

export async function requestNavigation(
  type: StoreNavigationTypeSW,
  depth: number
): Promise<ExtendedCategory[] | undefined> {
  try {
    return await apiInstance.invoke(
      'readNavigation post /navigation/{activeId}/{rootId} sw-include-seo-urls',
      {
        activeId: type,
        rootId: type,
        depth: depth
      }
    );
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestCategory(
  categoryId: string,
  criteria?: Partial<ProductListingCriteria>
): Promise<ExtendedCategory | undefined> {
  try {
    return await apiInstance.invoke('readCategory post /category/{navigationId}?slots', {
      navigationId: categoryId,
      criteria
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestCategoryList(
  criteria: Partial<ExtendedCriteria>
): Promise<CategoryListingResultSW | undefined> {
  try {
    return await apiInstance.invoke('readCategoryList post /category', criteria);
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestProductsCollection(
  criteria: Partial<ProductListingCriteria>
): Promise<ExtendedProductListingResult | undefined> {
  try {
    return await apiInstance.invoke('readProduct post /product', criteria);
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestCategoryProductsCollection(
  categoryId: string,
  criteria: Partial<ProductListingCriteria>
): Promise<ExtendedProductListingResult | undefined> {
  try {
    return await apiInstance.invoke('readProductListing post /product-listing/{categoryId}', {
      ...criteria,
      categoryId: categoryId
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestSearchCollectionProducts(
  criteria?: Partial<ProductListingCriteria>
): Promise<ExtendedProductListingResult | undefined> {
  try {
    return await apiInstance.invoke('searchPage post /search', {
      search: encodeURIComponent(criteria?.query || ''),
      ...criteria
    });
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestSeoUrls(routeName: RouteNames, page: number = 1, limit: number = 100) {
  try {
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
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestSeoUrl(
  handle: string,
  page: number = 1,
  limit: number = 1
): Promise<SeoURLResultSW | undefined> {
  try {
    const criteriaSeoUrls = {
      page: page,
      limit: limit,
      filter: [
        {
          type: 'multi',
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
    };
    // @ts-ignore
    return await apiInstance.invoke('readSeoUrl post /seo-url', criteriaSeoUrls);
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestCrossSell(
  productId: string,
  criteria?: Partial<ProductListingCriteria>
): Promise<ExtendedCrossSellingElementCollection | undefined> {
  try {
    return await apiInstance.invoke(
      'readProductCrossSellings post /product/{productId}/cross-selling',
      {
        productId: productId,
        ...criteria
      }
    );
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}

export async function requestCart() {
  try {
    return apiInstance.invoke('readCart get /checkout/cart?name', {});
  } catch (error) {
    if (error instanceof ApiClientError) {
      console.error(error);
      console.error('Details:', error.details);
    } else {
      console.error('==>', error);
    }
  }
}
