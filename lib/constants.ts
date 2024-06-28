export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey: string;
  reverse: boolean;
};

export const DEFAULT_SORT: SortFilterItem = {
  title: 'Latest arrivals',
  slug: 'latest-desc',
  sortKey: 'createdAt',
  reverse: true
};

export const SORTING: SortFilterItem[] = [
  DEFAULT_SORT,
  {
    title: 'Price: Low to high',
    slug: 'price-asc',
    sortKey: 'variants.price.amount',
    reverse: false
  },
  {
    title: 'Price: High to low',
    slug: 'price-desc',
    sortKey: 'variants.price.amount',
    reverse: true
  }
];

export const TAGS = {
  collections: 'collections',
  products: 'products',
  cart: 'cart'
};

export const DEFAULT_OPTION = 'Default Title';
