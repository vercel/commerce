export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type Cart = Omit<ShopifyCart, 'lines'> & {
  lines: CartItem[];
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
    coreVariantId: { value: string } | null;
  };
  coreCharge?: CartItem;
};

export type Collection = ShopifyCollection & {
  path: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type Menu = {
  title: string;
  path: string;
  items: Menu[];
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type PageMetafield = {
  id: string;
  value: string;
};

export const PAGE_TYPES = [
  'image',
  'icon_content_section',
  'page_section',
  'accordion',
  'category_preview'
] as const;
export type PageType = (typeof PAGE_TYPES)[number];

export type ShopifyPage = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: SEO;
  createdAt: string;
  updatedAt: string;
  metafield: PageMetafield | null;
};

export type Page = Omit<ShopifyPage, 'metafield'> & {
  metaobjects?: Metaobject[];
};
export type ShopifyMetaobject = {
  id: string;
  type: string;
  fields: Array<{
    key: string;
    value: string;
    reference: {
      id: string;
    };
  }>;
};

export type Metaobject = {
  id: string;
  type: string;
  [key: string]: string;
};

export type Product = Omit<
  ShopifyProduct,
  'variants' | 'images' | 'fuelType' | 'engineCylinders'
> & {
  variants: ProductVariant[];
  images: Image[];
  fuelType: string | null;
  engineCylinders: number[] | null;
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
  coreCharge: Money | null;
  waiverAvailable: boolean | null;
  barcode: string | null;
  sku: string | null;
  coreVariantId: string | null;
  mileage: number | null;
  estimatedDelivery: string | null;
  condition: string | null;
  engineCylinders: string | null;
  fuelType: string | null;
};

export type ShopifyCartProductVariant = {
  title: string;
  id: string;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  coreVariantId: { value: string } | null;
};

export type CartProductVariant = Omit<ShopifyCartProductVariant, 'coreVariantId'> & {
  coreVariantId: string | null;
};

export type ShopifyProductVariant = Omit<
  ProductVariant,
  'coreCharge' | 'waiverAvailable' | 'coreVariantId' | 'mileage' | 'estimatedDelivery' | 'condition'
> & {
  waiverAvailable: { value: string };
  coreVariantId: { value: string } | null;
  coreCharge: { value: string } | null;
  mileage: { value: number } | null;
  estimatedDelivery: { value: string } | null;
  condition: { value: string } | null;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
  lines: Connection<CartItem>;
  totalQuantity: number;
};

export type ShopifyCollection = {
  handle: string;
  title: string;
  description: string;
  seo: SEO;
  updatedAt: string;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: ProductOption[];
  priceRange: {
    maxVariantPrice: Money;
    minVariantPrice: Money;
  };
  variants: Connection<ShopifyProductVariant>;
  featuredImage: Image;
  images: Connection<Image>;
  seo: SEO;
  tags: string[];
  updatedAt: string;
  collections: {
    nodes: {
      title: string;
      handle: string;
    }[];
  };
  engineCylinders: { value: string } | null;
  fuelType: { value: string } | null;
};

export type ShopifyCartOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    cartId: string;
  };
};

export type ShopifyCreateCartOperation = {
  data: { cartCreate: { cart: ShopifyCart } };
};

export type ShopifyAddToCartOperation = {
  data: {
    cartLinesAdd: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifySetCartAttributesOperation = {
  data: {
    cart: ShopifyCart;
  };
  variables: {
    attributes: CartAttributeInput[];
    cartId: string;
  };
};

export type ShopifyRemoveFromCartOperation = {
  data: {
    cartLinesRemove: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lineIds: string[];
  };
};

export type ShopifyUpdateCartOperation = {
  data: {
    cartLinesUpdate: {
      cart: ShopifyCart;
    };
  };
  variables: {
    cartId: string;
    lines: {
      id: string;
      merchandiseId: string;
      quantity: number;
    }[];
  };
};

export type ShopifyCollectionOperation = {
  data: {
    collection: ShopifyCollection;
  };
  variables: {
    handle?: string;
    id?: string;
  };
};

export type PageInfo = {
  startCursor: string;
  hasNextPage: boolean;
  endCursor: string;
};

export type ShopifyCollectionProductsOperation = {
  data: {
    collection: {
      products: Connection<ShopifyProduct> & {
        filters: ShopifyFilter[];
        pageInfo: PageInfo;
      };
    };
  };
  variables: {
    handle: string;
    reverse?: boolean;
    sortKey?: string;
    filters?: Array<object>;
    after?: string;
  };
};

export type ShopifyCollectionsOperation = {
  data: {
    collections: Connection<ShopifyCollection>;
  };
};

export type ShopifyMenuOperation = {
  data: {
    menu?: {
      items: {
        title: string;
        url: string;
      }[];
    };
  };
  variables: {
    handle: string;
  };
};

export type ShopifyPageOperation = {
  data: { pageByHandle: ShopifyPage };
  variables: { handle: string; key: string; namespace: string };
};

export type ShopifyImageOperation = {
  data: { node: { image: Image } };
  variables: { id: string };
};

export type ShopifyMetaobjectsOperation = {
  data: { metaobjects: Connection<ShopifyMetaobject> };
  variables: { type: string };
};

export type ShopifyPagesOperation = {
  data: {
    pages: Connection<ShopifyPage>;
  };
};

export type ShopifyMetaobjectOperation = {
  data: { nodes: ShopifyMetaobject[] };
  variables: { ids: string[] };
};

export type ShopifyProductOperation = {
  data: { product: ShopifyProduct };
  variables: {
    handle: string;
  };
};

export type ProductVariantOperation = {
  data: { node: ShopifyCartProductVariant };
  variables: {
    id: string;
  };
};

export type ShopifyProductRecommendationsOperation = {
  data: {
    productRecommendations: ShopifyProduct[];
  };
  variables: {
    productId: string;
  };
};

export type ShopifyProductsOperation = {
  data: {
    products: Connection<ShopifyProduct> & {
      pageInfo: PageInfo;
    };
  };
  variables: {
    query?: string;
    reverse?: boolean;
    sortKey?: string;
    after?: string;
  };
};

export type CoreChargeOption = {
  label: string;
  value: string;
  price: Money;
};

export type ShopifyFilter = {
  id: string;
  label: string;
  type: FilterType;
  values: {
    id: string;
    input: string;
    count: number;
    label: string;
  }[];
};

export enum FilterType {
  // eslint-disable-next-line no-unused-vars
  LIST = 'LIST',
  // eslint-disable-next-line no-unused-vars
  PRICE_RANGE = 'PRICE_RANGE'
}

export type Filter = {
  id: string;
  label: string;
  type: FilterType;
  values: {
    id: string;
    input: string;
    count: number;
    label: string;
    value: unknown;
  }[];
};

export const SCREEN_SIZES = ['small', 'medium', 'large', 'extra_large'] as const;

export type ScreenSize = (typeof SCREEN_SIZES)[number];

export type CartAttributeInput = {
  key: string;
  value: string;
};
