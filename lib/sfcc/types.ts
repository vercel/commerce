export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
  path: string;
};

export type SalesforceProduct = {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  featuredImage: Image;
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  seo: SEO;
  options: ProductOption[];
  tags: string[];
  variants: ProductVariant[];
  images: Image[];
  availableForSale: boolean;
  updatedAt: string;
};

export type Product = Omit<SalesforceProduct, 'variants' | 'images'> & {
  variants: ProductVariant[];
  images: Image[];
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

export type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  height: number;
  width: number;
};

export type SEO = {
  title: string;
  description: string;
};

export type SalesforceCart = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type Cart = Omit<SalesforceCart, 'lines'> & {
  lines: CartItem[];
};

export type CartItem = {
  id: string | undefined;
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
    product: CartProduct;
  };
};

export type CartProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: Image;
};

export type ProductRecommendations = {
  id: string;
  name: string;
  recommendations: RecommendedProduct[];
};

export type RecommendedProduct = {
  recommended_item_id: string;
  recommendation_type: {
    _type: string;
    display_value: string;
    value: number;
  };
};

export type Menu = {
  title: string;
  path: string;
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
