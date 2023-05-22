export enum BigCommerceSortKeys {
  A_TO_Z = 'A_TO_Z',
  BEST_REVIEWED = 'BEST_REVIEWED',
  BEST_SELLING = 'BEST_SELLING',
  RELEVANCE = 'RELEVANCE',
  FEATURED = 'FEATURED',
  HIGHEST_PRICE = 'HIGHEST_PRICE',
  LOWEST_PRICE = 'LOWEST_PRICE',
  NEWEST = 'NEWEST',
  Z_TO_A = 'Z_TO_A'
}

export enum VercelSortKeys {
  RELEVANCE = 'RELEVANCE',
  BEST_SELLING = 'BEST_SELLING',
  CREATED_AT = 'CREATED_AT',
  PRICE = 'PRICE'
}

export enum vercelToBigCommerceSortKeys {
  RELEVANCE = 'RELEVANCE',
  BEST_SELLING = 'BEST_SELLING',
  CREATED_AT = 'NEWEST',
  PRICE = 'LOWEST_PRICE',
  PRICE_ON_REVERSE = 'HIGHEST_PRICE'
}

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: keyof typeof VercelSortKeys;
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

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
