export type Content = {
  contentId: string;
  contentUrl: string;
};

export type ContentLandingPage = {
  contentLandingPageId: string;
  banner?: string;
  slug: string;
  content: Content;
  store: Store;
  productId: string;
  reviews: ProductReviews;
};

export type ContentLandingPages = {
  [key: string]: ContentLandingPage;
};

export type Store = {
  storeId: string;
  clientId: string;
  domain: string;
  key: string;
};

export type ProductReviews = {
  rating: number;
  reviewCount: number;
  reviews: Review[];
};

export type Review = {
  reviewId: string;
  title: string;
  description: string;
  rating: number;
};
