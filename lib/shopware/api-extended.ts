import { operations, operationPaths, components } from '@shopware/api-client/api-types';

type schemas = components['schemas'];
type operationsWithoutOriginal = Omit<
  operations,
  | 'readCategory'
  | 'readCategoryList'
  | 'readNavigation'
  | 'readProduct'
  | 'readProductCrossSellings'
  | 'readProductListing'
  | 'searchPage'
>;
export type extendedPaths =
  | 'readCategory post /category/{navigationId}?slots'
  | 'readCategoryList post /category'
  | 'readNavigation post /navigation/{activeId}/{rootId} sw-include-seo-urls'
  | 'readProduct post /product'
  | 'readProductCrossSellings post /product/{productId}/cross-selling'
  | 'readProductListing post /product-listing/{categoryId}'
  | 'searchPage post /search'
  | operationPaths;
export type extendedOperations = operationsWithoutOriginal & {
  readCategory: extendedReadCategory;
  readCategoryList: extendedReadCategoryList;
  readNavigation: extendedReadNavigation;
  readProduct: extendedReadProduct;
  readProductCrossSellings: extendedReadProductCrossSellings;
  readProductListing: extendedReadProductListing;
  searchPage: extendedSearchPage;
};

export type ExtendedCmsBlock = Omit<schemas['CmsBlock'], 'slots'> & {
  slots?: schemas['CmsSlot'][];
};
export type ExtendedCmsSection = Omit<schemas['CmsSection'], 'blocks'> & {
  blocks?: ExtendedCmsBlock[];
};
export type ExtendedCmsPage = Omit<schemas['CmsPage'], 'sections'> & {
  sections?: ExtendedCmsSection[];
};

export type ExtendedProduct = Omit<
  schemas['Product'],
  'children' | 'seoUrls' | 'options' | 'media'
> & {
  children?: ExtendedProduct[];
  seoUrls?: schemas['SeoUrl'][];
  options?: schemas['PropertyGroupOption'][];
  media?: schemas['ProductMedia'][];
};

export type ExtendedProductListingResult = Omit<schemas['ProductListingResult'], 'elements'> & {
  elements?: ExtendedProduct[];
};

export type ExtendedCrossSellingElementCollection = Omit<
  schemas['CrossSellingElementCollection'],
  'products'
> & {
  products?: ExtendedProduct[];
}[];

export type ExtendedCategory = Omit<schemas['Category'], 'children' | 'seoUrls' | 'cmsPage'> & {
  children?: ExtendedCategory[];
  seoUrls?: schemas['SeoUrl'][];
  cmsPage?: ExtendedCmsPage;
};

export type ExtendedCriteria = Omit<schemas['Criteria'], 'filter'> & {
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
          elements?: ExtendedProduct[];
        } & schemas['EntitySearchResult'];
      };
    };
  };
};

type extendedReadProductCrossSellings = {
  parameters: {
    path: {
      /** Product ID */
      productId: string;
    };
  };
  responses: {
    /** Found cross sellings */
    200: {
      content: {
        'application/json': ExtendedCrossSellingElementCollection
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
        schemas['ProductListingFlags'];
    };
  };
  responses: {
    /** Returns a product listing containing all products and additional fields to display a listing. */
    200: {
      content: {
        'application/json': ExtendedProductListingResult;
      };
    };
  };
};

type extendedReadNavigation = {
  parameters: {
    header?: {
      /** Instructs Shopware to try and resolve SEO URLs for the given navigation item */
      'sw-include-seo-urls'?: boolean;
    };
    path: {
      /** Identifier of the active category in the navigation tree (if not used, just set to the same as rootId). */
      activeId: string;
      /** Identifier of the root category for your desired navigation tree. You can use it to fetch sub-trees of your navigation tree. */
      rootId: string;
    };
  };
  requestBody: {
    content: {
      'application/json': ExtendedCriteria & {
        /** Return the categories as a tree or as a flat list. */
        buildTree?: unknown;
        /** Determines the depth of fetched navigation levels. */
        depth?: unknown;
      };
    };
  };
  responses: {
    /** All available navigations */
    200: {
      content: {
        'application/json': ExtendedCategory[];
      };
    };
  };
};

type extendedReadCategory = {
  parameters: {
    query?: {
      /** Resolves only the given slot identifiers. The identifiers have to be seperated by a '|' character */
      slots?: string;
    };
    path: {
      /** Identifier of the category to be fetched */
      navigationId: string;
    };
  };
  requestBody?: {
    content: {
      'application/json': ExtendedCriteria &
        Omit<schemas['ProductListingCriteria'], 'filter'> &
        ExtendedCriteria;
    };
  };
  responses: {
    /** The loaded category with cms page */
    200: {
      content: {
        'application/json': ExtendedCategory;
      };
    };
  };
};

type extendedReadCategoryList = {
  requestBody?: {
    content: {
      'application/json': ExtendedCriteria;
    };
  };
  responses: {
    /** Entity search result containing categories. */
    200: {
      content: {
        'application/json': {
          elements?: ExtendedCategory[];
        } & components['schemas']['EntitySearchResult'];
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
      'application/json': ExtendedProductCriteria & schemas['ProductListingFlags'];
    };
  };
  responses: {
    /** Returns a product listing containing all products and additional fields to display a listing. */
    200: {
      content: {
        'application/json': ExtendedProductListingResult;
      };
    };
  };
};
