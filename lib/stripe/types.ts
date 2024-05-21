export type Cart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount?: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  totalQuantity: number;
  lines: CartItem[];
};

export type Merchandise = {
  id: string;
  title: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  product: Product;
};

export type CartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: Money;
  };
  merchandise: Merchandise;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width?: number;
  height?: number;
};

export type Menu = {
  title: string;
  path: string;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Page = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string | null;
  descriptionHtml: string | null;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  featuredImage?: Image;
  images: Image[];
  seo: SEO;
  tags: string[];
  updatedAt: string;
  createdAt: string;
};

export type ProductDetail = Product & {
  variants: ProductVariant[];
};

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
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

export type SEO = {
  title: string;
  description: string | null;
};
