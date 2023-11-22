export type SortFilterItem = {
  title: string;
  slug: string | null;
  sortKey:
    | "price desc"
    | "createdAt desc"
    | "reviewRatingStatistics.averageRating desc"
    | undefined;
  reverse: boolean;
};

export const defaultSort: SortFilterItem = {
  title: "Relevance",
  slug: null,
  sortKey: undefined,
  reverse: false
};

export const sorting: SortFilterItem[] = [
  defaultSort,
  {
    title: "Rating",
    slug: "rating-desc",
    sortKey: "reviewRatingStatistics.averageRating desc",
    reverse: false
  },
  { title: "Latest arrivals", slug: "latest-desc", sortKey: "createdAt desc", reverse: false }, //ctp: createdAt
  {
    title: "Price: Low to high",
    slug: "price-asc",
    sortKey: "price desc",
    reverse: true
  },
  {
    title: "Price: High to low",
    slug: "price-desc",
    sortKey: "price desc",
    reverse: false
  }
];

export const TAGS = {
  collections: "collections",
  products: "products",
  cart: "cart"
};

export const HIDDEN_PRODUCT_TAG = "nextjs-frontend-hidden";
export const DEFAULT_OPTION = "Default Title";
export const SHOPIFY_GRAPHQL_API_ENDPOINT = "/api/2023-01/graphql.json";
