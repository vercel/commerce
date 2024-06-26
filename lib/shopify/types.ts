/* eslint-disable no-unused-vars */
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
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage: Image;
      productType: string;
    };
    coreVariantId: { value: string } | null;
    addOnQuantity: { value: string } | null;
    addOnProductId: { value: string } | null;
  };
  coreCharge?: CartItem;
  addOnProduct?: CartItem & { quantity: number };
};

export type Collection = Omit<ShopifyCollection, 'helpfulLinks' | 'helpfulLinksTop'> & {
  path: string;
  helpfulLinks: string[] | null;
  helpfulLinksTop: string[] | null;
};

export type Customer = {
  emailAddress: string;
  firstName?: string;
  lastName?: string;
  displayName?: string;
  id: string;
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

export type Fulfillment = {
  status: string;
  createdAt: string;
  fulfilledLineItems: {
    id: string;
    quantity: number;
    image: Image;
  }[];
  trackingInformation: {
    number: string;
    company: string;
    url: string;
  }[];
  events: {
    status: string;
    happenedAt: string;
  }[];
};

export type Transaction = {
  processedAt: string;
  paymentIcon: Image;
  paymentDetails: {
    last4: string;
    cardBrand: string;
  };
  transactionAmount: Money;
};

export type Address = {
  address1: string;
  address2: string | null;
  firstName: string;
  lastName: string;
  provinceCode: string;
  city: string;
  zip: string;
  country: string;
  company: string | null;
  phone: string;
};

export type LineItem = {
  id: string;
  title: string;
  image: Image | null;
  price?: Money;
  quantity?: number;
  sku?: string;
  totalPrice?: Money;
  variantTitle?: string;
};

export type Order = {
  id: string;
  normalizedId: string;
  name: string;
  customer?: Customer;
  processedAt: string;
  createdAt: string;
  fulfillments: Fulfillment[];
  transactions: Transaction[];
  lineItems: LineItem[];
  shippingAddress?: Address;
  billingAddress?: Address;
  /** the price of all line items, excluding taxes and surcharges */
  subtotal?: Money;
  totalShipping?: Money;
  totalTax?: Money;
  totalPrice?: Money;
  shippingMethod?: {
    name: string;
    price: Money;
  };
};

export type ShopifyOrder = {
  id: string;
  name: string;
  confirmationNumber: string;
  customer: ShopifyCustomer;
  processedAt: string;
  createdAt: string;
  cancelledAt: string | null;
  currencyCode: string;
  transactions: ShopifyOrderTransaction[];
  billingAddress: ShopifyAddress;
  shippingAddress: ShopifyAddress;
  fulfillments: Connection<ShopifyFulfillment>;
  lineItems: {
    nodes: ShopifyLineItem[];
  };
  totalPrice: ShopifyMoneyV2;
  subtotal: ShopifyMoneyV2;
  totalShipping: ShopifyMoneyV2;
  totalTax: ShopifyMoneyV2;
  financialStatus: string;
  totalRefunded: ShopifyMoneyV2;
  refunds: ShopifyRefund[];
  paymentInformation: ShopifyOrderPaymentInformation;
  requiresShipping: boolean;
  shippingLine: ShopifyShippingLine;
  note: string | null;
};

type ShopifyShippingLine = {
  title: string;
  originalPrice: ShopifyMoneyV2;
};

type ShopifyOrderTransaction = {
  id: string;
  processedAt: string;
  paymentIcon: ShopifyPaymentIconImage;
  paymentDetails: ShopifyCardPaymentDetails;
  transactionAmount: ShopifyMoneyBag;
  giftCardDetails: ShopifyGiftCardDetails | null;
  status: string;
  kind: string;
  transactionParentId: string | null;
  type: string;
  typeDetails: ShopifyTransactionTypeDetails;
};

type ShopifyPaymentIconImage = {
  id: string;
  url: string;
  altText: string;
};

type ShopifyCardPaymentDetails = {
  last4: string;
  cardBrand: string;
};

type ShopifyGiftCardDetails = {
  last4: string;
  balance: ShopifyMoneyV2;
};

type ShopifyMoneyBag = {
  presentmentMoney: ShopifyMoneyV2;
};

export type ShopifyMoneyV2 = {
  amount: string;
  currencyCode: string;
};

type ShopifyTransactionTypeDetails = {
  name: string;
  message: string | null;
};

export type ShopifyAddress = {
  id: string;
  address1: string;
  address2: string | null;
  firstName: string;
  lastName: string;
  provinceCode: string;
  city: string;
  zip: string;
  countryCodeV2: string;
  company: string | null;
  phone: string;
};

type ShopifyFulfillment = {
  id: string;
  status: string;
  createdAt: string;
  estimatedDeliveryAt: string | null;
  trackingInformation: ShopifyTrackingInformation[];
  requiresShipping: boolean;
  fulfillmentLineItems: ShopifyFulfillmentLineItemConnection;
  events: Connection<ShopifyFulfillmentEvent>;
};

type ShopifyTrackingInformation = {
  number: string;
  company: string;
  url: string;
};

type ShopifyFulfillmentLineItemConnection = {
  nodes: ShopifyFulfillmentLineItem[];
};

type ShopifyFulfillmentLineItem = {
  id: string;
  quantity: number;
  lineItem: ShopifyLineItem;
};

type ShopifyLineItem = {
  id: string;
  title: string;
  image: Image | null;
  price: ShopifyMoneyV2;
  quantity: number;
  sku: string;
  totalPrice: ShopifyMoneyV2;
  variantTitle: string;
};

type ShopifyFulfillmentEvent = {
  status: string;
  happenedAt: string;
};

type ShopifyRefund = {
  id: string;
  createdAt: string;
};

type ShopifyOrderPaymentInformation = {
  paymentCollectionUrl: string;
  paymentStatus: string;
  totalPaidAmount: ShopifyMoneyV2;
  totalOutstandingAmount: ShopifyMoneyV2;
  paymentTerms: ShopifyPaymentTerms | null;
};

type ShopifyPaymentTerms = {
  id: string;
  overdue: boolean;
  nextDueAt: string;
  paymentSchedules: ShopifyPaymentScheduleConnection;
};

type ShopifyPaymentScheduleConnection = {
  nodes: ShopifyPaymentSchedule[];
};

type ShopifyPaymentSchedule = {
  id: string;
  dueAt: string;
  completed: boolean;
  amount: ShopifyMoneyV2;
};

export type ShopifyCustomer = {
  id: string;
  emailAddress: ShopifyCustomerEmailAddress;
  firstName: string;
  lastName: string;
  phoneNumber: ShopifyCustomerPhoneNumber | null;
  imageUrl: string;
  displayName: string;
};

type ShopifyCustomerEmailAddress = {
  emailAddress: string;
  marketingState: string;
};

type ShopifyCustomerPhoneNumber = {
  phoneNumber: string;
  marketingState: string;
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

export type TransmissionType = 'Automatic' | 'Manual';

export type Product = Omit<
  ShopifyProduct,
  | 'variants'
  | 'images'
  | 'fuelType'
  | 'engineCylinders'
  | 'driveType'
  | 'transmissionType'
  | 'transmissionSpeeds'
  | 'transmissionCode'
  | 'transmissionTag'
> & {
  variants: ProductVariant[];
  images: Image[];
  fuelType: string | null;
  engineCylinders: number[] | null;
  driveType: string[] | null;
  transmissionType: TransmissionType | null;
  transmissionSpeeds: number[] | null;
  transmissionCode: string[] | null;
  transmissionTag: string[] | null;
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
  addOnProduct?: {
    quantity: number;
    id: string;
  };
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
  | 'coreCharge'
  | 'waiverAvailable'
  | 'coreVariantId'
  | 'mileage'
  | 'estimatedDelivery'
  | 'condition'
  | 'addOnProduct'
> & {
  waiverAvailable: { value: string };
  coreVariantId: { value: string } | null;
  coreCharge: { value: string } | null;
  mileage: { value: number } | null;
  estimatedDelivery: { value: string } | null;
  condition: { value: string } | null;
  addOnProductId: { value: string } | null;
  addOnQuantity: { value: string } | null;
};

export type SEO = {
  title: string;
  description: string;
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  attributes: { key: string; value: string }[];
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
  helpfulLinks: { value: string } | null;
  helpfulLinksTop: { value: string } | null;
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
  transmissionType: { value: string } | null;
  transmissionTag: { value: string } | null;
  transmissionCode: { value: string } | null;
  driveType: { value: string } | null;
  transmissionSpeeds: { value: string } | null;
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

export type ShopifyCustomerOperation = {
  data: {
    customer: ShopifyCustomer;
  };
};

export type ShopifyCustomerOrdersOperation = {
  data: {
    customer: {
      orders: Connection<ShopifyOrder>;
    };
  };
};

export type ShopifyCustomerOrderOperation = {
  data: {
    order: ShopifyOrder;
  };
  variables: {
    orderId: string;
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

export type UploadInput = {
  filename: string;
  mimeType: string;
  httpMethod: 'POST' | 'PUT';
  fileSize: string;
  resource: 'FILE' | 'IMAGE';
};

export type StagedUploadsCreatePayload = {
  parameters: {
    name: string;
    value: string;
  }[];
  resourceUrl: string;
  url: string;
};

export type ShopifyStagedUploadOperation = {
  data: {
    stagedUploadsCreate: {
      stagedTargets: StagedUploadsCreatePayload[];
    };
  };
  variables: { input: UploadInput[] };
};

export type FileCreateInput = {
  alt: string;
  contentType: 'FILE' | 'IMAGE';
  originalSource: string;
};

export type ShopifyCreateFileOperation = {
  data: {
    fileCreate: {
      files: { fileStatus: string; id: string }[];
      userErrors: { code: string; field: string; message: string }[];
    };
  };
  variables: { files: FileCreateInput[] };
};

export type Metafield = {
  namespace: string;
  value: string;
  key: string;
  type: string;
};

export type ShopifyUpdateOrderMetafieldsOperation = {
  data: {
    orderUpdate: {
      order: {
        id: string;
      };
      userErrors: { field: string; message: string }[];
    };
  };
  variables: {
    input: {
      metafields: Metafield[];
      id: string;
    };
  };
};

export enum WarrantyStatus {
  Activated = 'Activated',
  NotActivated = 'Not Activated',
  LimitedActivated = 'Limited Activation'
}

export type ShopifyOrderMetafield = {
  warrantyStatus: { value: WarrantyStatus } | null;
  warrantyActivationDeadline: { value: string } | null;
};

export type OrderMetafield = {
  warrantyStatus: WarrantyStatus | null;
  warrantyActivationDeadline: string | null;
};
