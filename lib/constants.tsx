import { ProductOrderField } from './saleor/generated/graphql';

export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: ProductOrderField;
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: 'Relevance',
  slug: null,
  sortKey: ProductOrderField.Rank,
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  { title: 'Trending', slug: 'trending-desc', sortKey: ProductOrderField.Rating, reverse: false }, // asc
  {
    title: 'Latest arrivals',
    slug: 'latest-desc',
    sortKey: ProductOrderField.PublishedAt,
    reverse: true
  },
  {
    title: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: ProductOrderField.MinimalPrice,
    reverse: false
  }, // asc
  {
    title: 'Price: High to low',
    slug: 'price-desc',
    sortKey: ProductOrderField.MinimalPrice,
    reverse: true
  }
];

export const HIDDEN_PRODUCT_TAG = 'nextjs-frontend-hidden';
export const DEFAULT_OPTION = 'Default Title';
export const SHOPIFY_GRAPHQL_API_ENDPOINT = '/api/2023-01/graphql.json';
