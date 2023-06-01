export type Maybe<T> = T | null;

export type Connection<T> = {
  edges: Array<Edge<T>>;
};

export type Edge<T> = {
  node: T;
};

export type VercelPage = {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo?: VercelSEO;
  createdAt: string;
  updatedAt: string;
};

export type VercelMenu = {
  title: string;
  path: string;
};

export type VercelCollection = {
  handle: string;
  title: string;
  description: string;
  seo: VercelSEO;
  updatedAt: string;
  path: string;
};

type VercelMoney = {
  amount: string;
  currencyCode: string;
};

export type Image = {
  url: string;
  altText: string;
  width: number;
  height: number;
};

export type VercelProduct = {
  id: string;
  handle: string;
  availableForSale: boolean;
  title: string;
  description: string;
  descriptionHtml: string;
  options: VercelProductOption[];
  priceRange: {
    maxVariantPrice: VercelMoney;
    minVariantPrice: VercelMoney;
  };
  variants: VercelProductVariant[];
  featuredImage: Image;
  images: Image[];
  seo: VercelSEO;
  tags: string[];
  updatedAt: string;
};

export type VercelProductOption = {
  id: string;
  name: string;
  values: string[];
};

export type VercelProductVariant = {
  parentId?: string;
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  price: VercelMoney;
};

export type VercelSEO = {
  title: string;
  description: string;
};

export type VercelCartItem = {
  id: string;
  quantity: number;
  cost: {
    totalAmount: VercelMoney;
  };
  merchandise: {
    id: string;
    title: string;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    product: VercelProduct;
  };
};

export type VercelCart = {
  id: string;
  checkoutUrl: string;
  cost: {
    subtotalAmount: VercelMoney;
    totalAmount: VercelMoney;
    totalTaxAmount: VercelMoney;
  };
  lines: VercelCartItem[];
  totalQuantity: number;
};

export type BigCommerceCartOperation = {
  data: {
    site: {
      cart: BigCommerceCart;
    };
  };
  variables: {
    entityId: string;
  };
};

export type BigCommerceCreateCartOperation = {
  data: {
    cart: {
      createCart: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    createCartInput: {
      lineItems: CartItem[];
    };
  };
};

export type BigCommerceAddToCartOperation = {
  data: {
    cart: {
      addCartLineItems: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    addCartLineItemsInput: {
      cartEntityId: string;
      data: {
        lineItems: CartItem[];
      };
    };
  };
};

export type BigCommerceDeleteCartItemOperation = {
  data: {
    cart: {
      deleteCartLineItem: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    deleteCartLineItemInput: {
      cartEntityId: string;
      lineItemEntityId: string;
    };
  };
};

export type BigCommerceUpdateCartItemOperation = {
  data: {
    cart: {
      updateCartLineItem: {
        cart: BigCommerceCart;
      };
    };
  };
  variables: {
    updateCartLineItemInput: {
      cartEntityId: string;
      lineItemEntityId: string;
      data: {
        lineItem: CartItem;
      };
    };
  };
};

export type BigCommerceCheckoutOperation = {
  data: {
    site: {
      checkout: BigCommerceCheckout;
    };
  };
  variables: {
    entityId: string;
  };
};

export type BigCommerceProductOperation = {
  data: {
    site: {
      product: BigCommerceProduct;
    };
  };
  variables: {
    productId: number;
  };
};

export type BigCommerceProductsOperation = {
  data: {
    site: {
      products: Connection<BigCommerceProduct>;
    };
  };
  variables: {
    entityIds: number[] | [];
  };
};

export type BigCommerceEntityIdOperation = {
  data: {
    site: {
      route: {
        node: {
          __typename:
            | 'Product'
            | 'Category'
            | 'Brand'
            | 'NormalPage'
            | 'ContactPage'
            | 'RawHtmlPage'
            | 'BlogIndexPage';
          entityId: number;
        };
      };
    };
  };
  variables: {
    path: string;
  };
};

export type BigCommerceRecommendationsOperation = {
  data: {
    site: {
      product: {
        relatedProducts: Connection<BigCommerceProduct>;
      };
    };
  };
  variables: {
    productId: number | string;
  };
};

export type BigCommerceSearchProductsOperation = {
  data: {
    site: {
      search: {
        searchProducts: {
          products: Connection<BigCommerceProduct>;
        };
      };
    };
  };
  variables: {
    filters: {
      searchTerm: string;
    };
    sort: string | null;
  };
};

export type BigCommerceMenuOperation = {
  data: {
    site: {
      categoryTree: BigCommerceCategoryTreeItem[];
    };
  };
};

export type BigCommerceCollectionOperation = {
  data: {
    site: {
      category: BigCommerceCollection;
    };
  };
  variables: {
    entityId: number;
  };
};

export type BigCommerceProductsCollectionOperation = {
  data: {
    site: {
      category: {
        products: Connection<BigCommerceProduct>;
      };
    };
  };
  variables: {
    entityId: number;
    sortBy: string | null;
    hideOutOfStock: boolean;
    first: number;
  };
};

export type BigCommerceNewestProductsOperation = {
  data: {
    site: {
      newestProducts: Connection<BigCommerceProduct>;
    };
  };
  variables: {
    first: number;
  };
};

export type BigCommerceFeaturedProductsOperation = {
  data: {
    site: {
      featuredProducts: Connection<BigCommerceProduct>;
    };
  };
  variables: {
    first: number;
  };
};

export type BigCommercePopularProductsOperation = {
  data: {
    site: {
      bestSellingProducts: Connection<BigCommerceProduct>;
    };
  };
  variables: {
    first: number;
  };
};

export type BigCommerceCollectionsOperation = {
  data: {
    site: {
      categoryTree: BigCommerceCategoryWithId[];
    };
  };
};

export type BigCommercePageOperation = {
  data: {
    site: {
      content: {
        page: BigCommercePage;
      };
    };
  };
  variables: { entityId: number };
};

export type BigCommercePagesOperation = {
  data: {
    site: {
      content: {
        pages: Connection<BigCommercePage>;
      };
    };
  };
};

export type BigCommerceCheckout = {
  subtotal: BigCommerceMoney;
  grandTotal: BigCommerceMoney;
  taxTotal: BigCommerceMoney;
};

export type BigCommerceCategoryWithId = Omit<BigCommerceCollection, 'description' | 'seo' | 'path'>;

export type BigCommerceSEO = {
  pageTitle: string;
  metaDescription: string;
  metaKeywords: string;
};

export type BigCommerceCollection = {
  entityId: number;
  name: string;
  path: string;
  description: string;
  seo: BigCommerceSEO;
};

export type BigCommerceCart = {
  entityId: string;
  currencyCode: string;
  isTaxIncluded: boolean;
  baseAmount: BigCommerceMoney;
  discountedAmount: BigCommerceMoney;
  amount: BigCommerceMoney;
  discounts: CartDiscount[];
  lineItems: CartLineItems;
  createdAt: { utc: Date };
  updatedAt: { utc: Date };
  locale: string;
};

type CartLineItems = {
  physicalItems: DigitalOrPhysicalItem[];
  digitalItems: DigitalOrPhysicalItem[];
  customItems: CartCustomItem[];
  giftCertificates: CartGiftCertificate[];
  totalQuantity: number;
};

type CartItem = {
  quantity: number;
  productEntityId: number;
  variantEntityId?: number;
};

export type BigCommerceCategoryTreeItem = {
  name: string;
  path: string;
  hasChildren: boolean;
  entityId: number;
  children?: BigCommerceCategoryTreeItem[];
};

export type BigCommercePage = {
  __typename: 'NormalPage' | 'ContactPage' | 'RawHtmlPage' | 'BlogIndexPage';
  entityId: number;
  name: string;
  seo: BigCommerceSEO;
  path: string;
  plainTextSummary?: string;
  htmlBody?: string;
};

export type BigCommerceMoney = {
  value: number;
  currencyCode: string;
};

type CartDiscount = {
  entityId: string;
  discountedAmount: BigCommerceMoney;
};

type CartGiftCertificatePersonDetails = {
  name: string;
  email: string;
};

export type DigitalOrPhysicalItem = {
  entityId: number;
  parentEntityId: number | null;
  productEntityId: number;
  variantEntityId: number | null;
  sku: string;
  name: string;
  url: string;
  imageUrl: string | null;
  brand: string | null;
  quantity: number;
  isTaxable: boolean;
  listPrice: BigCommerceMoney;
  extendedListPrice: BigCommerceMoney;
  selectedOptions: {
    entityId: number;
    name: string;
    value?: string;
    date?: { utc: Date };
    text?: string;
    number?: string;
    fileName?: ScrollSetting;
  }[];
  isShippingRequired: boolean;
};

export type CartCustomItem = {
  entityId: string;
  productEntityId: undefined;
  sku: string;
  name: string;
  quantity: number;
  listPrice: BigCommerceMoney;
  extendedListPrice: BigCommerceMoney;
};

type CartGiftCertificate = {
  entityId: number;
  productEntityId: undefined;
  name: string;
  amount: BigCommerceMoney;
  isTaxable: boolean;
  message: string;
  sender: CartGiftCertificatePersonDetails;
  recipient: CartGiftCertificatePersonDetails;
};

export type BigCommerceProductVariant = {
  id: number;
  entityId: number;
  sku: string;
  upc: string | null;
  isPurchasable: boolean;
  prices: {
    price: BigCommerceMoney;
    priceRange: {
      min: BigCommerceMoney;
      max: BigCommerceMoney;
    };
  };
  options: {
    edges: Array<{
      node: {
        entityId: number;
        displayName: string;
        values: {
          edges: Array<{
            node: {
              entityId: number;
              label: string;
            };
          }>;
        };
      };
    }>;
  };
};

export type BigCommerceProductOption = {
  __typename: string;
  entityId: number;
  displayName: string;
  isRequired: boolean;
  displayStyle: string;
  values: {
    edges: Array<{
      node: {
        entityId: number;
        label: string;
        isDefault: boolean;
        hexColors: string[];
        imageUrl: string | null;
        isSelected: boolean;
      };
    }>;
  };
};

export type BigCommerceProduct = {
  id: number;
  entityId: number;
  sku: string;
  upc: string | null;
  name: string;
  brand: {
    name: string;
  } | null;
  plainTextDescription: string;
  description: string;
  availabilityV2: {
    status: string;
    description: string;
  };
  defaultImage: {
    url: string;
    altText: string;
  };
  images: {
    edges: Array<{
      node: {
        url: string;
        altText: string;
      };
    }>;
  };
  seo: BigCommerceSEO;
  prices: {
    price: BigCommerceMoney;
    priceRange: {
      min: BigCommerceMoney;
      max: BigCommerceMoney;
    };
  };
  createdAt: {
    utc: Date;
  };
  variants: Connection<BigCommerceProductVariant>;
  productOptions: Connection<BigCommerceProductOption>;
};
