import { components } from '@shopware/api-client/api-types';
import { ExtendedCriteria, ExtendedCategory, ExtendedCmsPage } from './api-extended';

/** Shopware Types */

/** Schemas */
export type ApiSchemas = components['schemas'];
export type StoreNavigationTypeSW = 'main-navigation' | 'footer-navigation' | 'service-navigation';
export type ProductListingCriteria = {
  query: string;
} & Omit<ApiSchemas['ProductListingCriteria'], 'filter'> &
  ExtendedCriteria;
export type RouteNames =
  | 'frontend.account.customer-group-registration.page'
  | 'frontend.detail.page'
  | 'frontend.landing.page'
  | 'frontend.navigation.page';

/** Return Types */
export type CategoryListingResultSW = {
  elements?: ExtendedCategory[];
} & ApiSchemas['EntitySearchResult'];
export type SeoURLResultSW = {
  elements?: ApiSchemas['SeoUrl'][];
} & ApiSchemas['EntitySearchResult'];

/** Vercel Commerce Types */
export type Menu = { id: string; title: string; path: string; type: string; children: Menu[] };

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  routeName?: string;
  foreignKey?: string;
  originalCmsPage?: ExtendedCmsPage;
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type SEO = {
  title: string;
  description: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type ProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: Money;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Product = {
  id: string;
  path: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: ProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  childCount: number;
  updatedAt: string;
};

export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: CartItem[];
  totalQuantity: number;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: Product;
  };
};
