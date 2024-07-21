export type Brand = {
  brandId: string;
  companyName: string;
};

export type Content = {
  contentId: string;
  contentUrl: string;
};

export type ContentLandingPage = {
  contentLandingPageId: string;
  slug: string;
  content: Content;
  brand: Brand;
  store: Store;
  productId: string;
};

export type ContentLandingPages = {
  [key: string]: ContentLandingPage;
};

export type Store = {
  storeId: string;
  name: string;
  logoUrl: string;
  domain: string;
  key: string;
};
