enum BigCommerceSortKeys {
  A_TO_Z = 'A_TO_Z',
  BEST_REVIEWED = 'BEST_REVIEWED',
  BEST_SELLING = 'BEST_SELLING',
  DEFAULT = 'DEFAULT',
  FEATURED = 'FEATURED',
  HIGHEST_PRICE = 'HIGHEST_PRICE',
  LOWEST_PRICE = 'LOWEST_PRICE',
  NEWEST = 'NEWEST',
  Z_TO_A = 'Z_TO_A'
}

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: keyof typeof BigCommerceSortKeys;
  hideOutOfStock: boolean;
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'DEFAULT',
  slug: null,
  sortKey: BigCommerceSortKeys.DEFAULT,
  hideOutOfStock: false,
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: 'Best Selling',
    slug: 'bestselling',
    sortKey: BigCommerceSortKeys.BEST_SELLING,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'Featured Items',
    slug: 'featured',
    sortKey: BigCommerceSortKeys.FEATURED,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'Newest Items',
    slug: 'newest',
    sortKey: BigCommerceSortKeys.NEWEST,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'A to Z',
    slug: 'alphaasc',
    sortKey: BigCommerceSortKeys.A_TO_Z,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'Z to A',
    slug: 'alphadesc',
    sortKey: BigCommerceSortKeys.Z_TO_A,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'By Review',
    slug: 'avgcustomerreview',
    sortKey: BigCommerceSortKeys.BEST_REVIEWED,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'Price: Ascending',
    slug: 'priceasc',
    sortKey: BigCommerceSortKeys.LOWEST_PRICE,
    hideOutOfStock: false,
    reverse: false
  },
  {
    title: 'Price: Descending',
    slug: 'pricedesc',
    sortKey: BigCommerceSortKeys.HIGHEST_PRICE,
    hideOutOfStock: false,
    reverse: false
  }
];

// TODO: check what we need them for
export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
