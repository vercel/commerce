export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: 'rating' | 'popularity' | 'date' | 'price';
  order?: 'asc' | 'desc';
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: 'popularity',
  order: 'desc'
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: 'rating', order: 'desc' }, // asc
  { title: 'Latest arrivals', slug: 'latest-desc', sortKey: 'date', order: 'desc' },
  { title: 'Price: Low to high', slug: 'price-asc', sortKey: 'price', order: 'asc' }, // asc
  { title: 'Price: High to low', slug: 'price-desc', sortKey: 'price', order: 'desc' }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
