export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'RELEVANCE' | 'BEST_SELLING' | 'CREATED_AT' | 'PRICE';
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'RELEVANCE',
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'BEST_SELLING', reverse: false }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'CREATED_AT', reverse: true },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'PRICE', reverse: false }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'PRICE', reverse: true }
];

export const PART_TYPES = [
  { label: 'Transmissions', value: 'transmissions' },
  { label: 'Engines', value: 'engines' }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart',
  pages: 'pages',
  orderMetafields: 'orderMetafields'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2024-04/graphql.json';
export const SHOPIFY_GRAPHQL_CUSTOMER_API_ENDPOINT = '/account/customer/api/2024-04/graphql';
export const SHOPIFY_GRAPHQL_ADMIN_ADMIN_API_ENDPOINT = '/admin/api/2024-04/graphql.json';

export const CORE_WAIVER = 'core-waiver';
export const CORE_VARIANT_ID_KEY = 'coreVariantId';

export const TRANSMISSION_CODE_FILTER_ID = 'filter.p.m.custom.transmission_code';
export const ENGINE_SIZE_FILTER_ID = 'filter.p.m.custom.engine_size';
export const AVAILABILITY_FILTER_ID = 'filter.v.availability';
export const PRICE_FILTER_ID = 'filter.v.price';
export const MAKE_FILTER_ID = 'filter.p.m.custom.make_composite';
export const MODEL_FILTER_ID = 'filter.p.m.custom.make_model_composite';
export const YEAR_FILTER_ID = 'filter.p.m.custom.make_model_year_composite';
export const PRODUCT_METAFIELD_PREFIX = 'filter.p.m';
export const VARIANT_METAFIELD_PREFIX = 'filter.v.m';

export const CONDITIONS = {
  Used: 'Used',
  Remanufactured: 'Remanufactured'
};

export const DELIVERY_OPTION_KEY = 'delivery';

export const ADD_ON_PRODUCT_TYPES = {
  addOn: 'Add On',
  coreCharge: 'Core Charge'
};

export const WARRANTY_FIELDS = [
  'warranty_activation_odometer',
  ['warranty_activation_installation', 'warranty_activation_self_install'],
  'warranty_activation_vin',
  'warranty_activation_mileage'
];

export const CORE_RETURN_FIELDS = [
  'core_return_name',
  'core_return_email',
  'core_return_phone',
  'core_return_address',
  'core_return_city',
  'core_return_zip',
  'core_return_state'
];

export const URL_PREFIXES = [
  '/transmissions',
  '/engines',
  '/transfer-cases',
  '/remanufactured-engines'
];

const phoneNumberMap: Record<string, { title: string; link: string }> = {
  'reman-transmission': {
    title: '(888) 242-2605',
    link: 'tel:8882422605'
  },
  'car-part-planet': {
    title: '(888) 412-2772',
    link: 'tel:8884122772'
  },
  'reman-engine': {
    title: '(877) 343-7352',
    link: 'tel:8773437352'
  },
  'engine-locator': {
    title: '(302) 966-3140',
    link: 'tel:3029663140'
  },
  'transmission-locator': {
    title: '(302) 966-3141',
    link: 'tel:3029663141'
  }
};

const { STORE_PREFIX } = process.env;

export const phoneNumber = phoneNumberMap[STORE_PREFIX!];
