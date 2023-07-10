import { operations, operationPaths, components } from '@shopware/api-client/api-types';

type operationsWithoutOriginal = Omit<
  operations,
  'readProduct' | 'searchPage' | 'readProductListing'
>;
export type extendedPaths = 'readProduct post /product' | operationPaths;
export type extendedOperations = operationsWithoutOriginal & {
  readProduct: extendedReadProduct;
  searchPage: extendedSearchPage;
  readProductListing: extendedReadProductListing;
};

export type ExtendedCriteria = Omit<components['schemas']['Criteria'], 'filter'> & {
  filter?: {
    field: string;
    type: string;
    value: string | boolean | null;
  }[];
};

type extendedReadProduct = {
  requestBody?: {
    content: {
      'application/json': ExtendedCriteria;
    };
  };
  responses: {
    /** Entity search result containing products */
    200: {
      content: {
        'application/json': {
          elements?: components['schemas']['Product'][];
        } & components['schemas']['EntitySearchResult'];
      };
    };
  };
};

type ExtendedProductCriteria = ExtendedCriteria & {
  /** Number of items per result page. If not set, the limit will be set according to the default products per page, defined in the system settings. */
  limit?: number;
  /** Filter by manufacturers. List of manufacturer identifiers separated by a `|`. */
  manufacturer?: string;
  /**
   * Enables/disabled filtering by manufacturer. If set to false, the `manufacturer` filter will be ignored. Also the `aggregations[manufacturer]` key will be removed from the response.
   * @default true
   */
  'manufacturer-filter'?: boolean;
  /**
   * Filters by a maximum product price. Has to be higher than the `min-price` filter.
   * @default 0
   */
  'max-price'?: number;
  /**
   * Filters by a minimum product price. Has to be lower than the `max-price` filter.
   * @default 0
   */
  'min-price'?: number;
  /** Specifies the sorting of the products by `availableSortings`. If not set, the default sorting will be set according to the shop settings. The available sorting options are sent within the response under the `availableSortings` key. In order to sort by a field, consider using the `sort` parameter from the listing criteria. Do not use both parameters together, as it might lead to unexpected results. */
  order?: string;
  /**
   * Search result page
   * @default 1
   */
  p?: number;
  /**
   * Enables/disabled filtering by price. If set to false, the `min-price` and `max-price` filter will be ignored. Also the `aggregations[price]` key will be removed from the response.
   * @default true
   */
  'price-filter'?: boolean;
  /** Filters products by their properties. List of property identifiers separated by a `|`. */
  properties?: string;
  /**
   * Enables/disabled filtering by properties products. If set to false, the `properties` filter will be ignored. Also the `aggregations[properties]` key will be removed from the response.
   * @default true
   */
  'property-filter'?: boolean;
  /** A whitelist of property identifiers which can be used for filtering. List of property identifiers separated by a `|`. The `property-filter` must be `true`, otherwise the whitelist has no effect. */
  'property-whitelist'?: string;
  /** Filter products with a minimum average rating. */
  rating?: number;
  /**
   * Enables/disabled filtering by rating. If set to false, the `rating` filter will be ignored. Also the `aggregations[rating]` key will be removed from the response.
   * @default true
   */
  'rating-filter'?: boolean;
  /** By sending the parameter `reduce-aggregations` , the post-filters that were applied by the customer, are also applied to the aggregations. This has the consequence that only values are returned in the aggregations that would lead to further filter results. This parameter is a flag, the value has no effect. */
  'reduce-aggregations'?: string | null;
  /**
   * Filters products that are marked as shipping-free.
   * @default false
   */
  'shipping-free'?: boolean;
  /**
   * Enables/disabled filtering by shipping-free products. If set to false, the `shipping-free` filter will be ignored. Also the `aggregations[shipping-free]` key will be removed from the response.
   * @default true
   */
  'shipping-free-filter'?: boolean;
};

type extendedSearchPage = {
  requestBody?: {
    content: {
      'application/json': {
        /** Using the search parameter, the server performs a text search on all records based on their data model and weighting as defined in the entity definition using the SearchRanking flag. */
        search: string;
      } & ExtendedProductCriteria &
        components['schemas']['ProductListingFlags'];
    };
  };
  responses: {
    /** Returns a product listing containing all products and additional fields to display a listing. */
    200: {
      content: {
        'application/json': components['schemas']['ProductListingResult'];
      };
    };
  };
};

type extendedReadProductListing = {
  parameters: {
    path: {
      /** Identifier of a category. */
      categoryId: string;
    };
  };
  requestBody?: {
    content: {
      'application/json': ExtendedProductCriteria & components['schemas']['ProductListingFlags'];
    };
  };
  responses: {
    /** Returns a product listing containing all products and additional fields to display a listing. */
    200: {
      content: {
        'application/json': components['schemas']['ProductListingResult'];
      };
    };
  };
};
