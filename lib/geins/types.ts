export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type CartType = {
  id: string | undefined;
  checkoutUrl: string;
  cost: {
    subtotalAmount: MoneyType;
    totalAmount: MoneyType;
    totalTaxAmount: MoneyType;
  };
  totalQuantity: number;
  lines: CartItemType[];
};

export type CartProductType = {
  id: string;
  handle: string;
  title: string;
  featuredImage: ProductImageType;
};

export type CartItemType = {
  id: string | undefined;
  quantity: number;
  cost: {
    totalAmount: MoneyType;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: CartProductType;
  };
};

export type CartItemInputType = {
  id?: string;
  skuId?: number;
  quantity: number;
};

export type SeoType = {
  title: string;
  description: string;
};

export type CollectionType = {
  id: string;
  title: string;
  description: string;
  handle: string;
  seo?: SeoType;
};

export type PageType = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SeoType;
  createdAt: string;
  updatedAt: string;
};

export type MenuType = {
  id: string;
  title?: string;
  name: string;
  items: MenuItemType[];
};

export type MenuItemType = {
  id: string;
  title: string;
  path: string;
  slug?: string;
};

export type CategoryItemType = {
  id: string;
  parentId: string;
  title: string;
  path: string;
  slug?: string;
  updatedAt?: string;
};

export enum ProductRelationTypeEnum {
  BRAND = 'BRAND',
  CATEGORY = 'CATEGORY',
  RELATED = 'RELATED',
  SIMILAR = 'SIMILAR',
  CROSS_SELL = 'CROSS_SELL',
  UP_SELL = 'UP_SELL'
}

export type ProductRelationType = {
  type: ProductRelationTypeEnum;
  name: string;
  alias: string;
};

export type MoneyType = {
  amount: string;
  currencyCode: string;
};

export type ProductType = {
  id: string;
  seo: {
    title?: string;
    description?: string;
  };
  currency: string;
  slug: string;
  handle: string;
  stockTracking: boolean;
  stockPurchasable: boolean;
  stockLevel: number;
  title: string;
  name: string;
  description: string;
  price: string;
  priceRange: {
    maxVariantPrice: MoneyType;
    minVariantPrice: MoneyType;
  };
  metaTitle: string;
  metaDescription: string;
  tags: string[];
  options: ProductOptionType[];
  variants: ProductVariantType[];
  featuredImage: ProductImageType;
  images: ProductImageType[];
  updatedAt?: string;
  availableForSale: boolean;
  descriptionHtml?: string;
  relations?: ProductRelationType[];
};

export type ProductOptionType = {
  id: string;
  name: string;
  values: string[];
};

export type ProductVariantType = {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: MoneyType;
};

export type ProductImageType = {
  caption: string;
  altText: string;
  url: string;
  src: string;
  width: number;
  height: number;
};

export type ImageType = {
  url: string;
  altText: string;
  width: number;
  height: number;
};
