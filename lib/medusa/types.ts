export type MedusaProductCollection = {
  name: any;
  description: string | undefined;
  id: string;
  title: string;
  handle: string;
  products?: Product[];
  created_at: string; // format: date-time
  updated_at: string; // format: date-time
  deleted_at?: string | null; // format: date-time
  metadata?: Record<string, unknown> | null;
};

export type ProductCollection = MedusaProductCollection & {
  seo?: {
    title?: string;
    description?: string;
  };
  path: string;
  updatedAt: string;
};

export type MedusaProduct = {
  id: string;
  title: string;
  subtitle?: string | null;
  description?: string | null;
  handle?: string | null;
  is_giftcard: boolean;
  status?: 'draft' | 'proposed' | 'published' | 'rejected';
  images?: Array<MedusaImage>;
  thumbnail?: string | null;
  options?: Array<MedusaProductOption>;
  variants: Array<MedusaProductVariant>;
  categories?: Array<ProductCategory>;
  profile_id?: string | null;
  profile?: ShippingProfile | null;
  weight?: number | null;
  length?: number | null;
  height?: number | null;
  width?: number | null;
  hs_code?: string | null;
  origin_country?: string | null;
  mid_code?: string | null;
  metadata?: Record<string, any>;
  discountable?: boolean;
  collection_id: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date | null;
  type_id: string;
  material?: string | null;
  tags?: ProductTag[];
};

export type Product = Partial<Omit<MedusaProduct, 'tags' | 'options' | 'variants'>> & {
  title: string;
  featuredImage: FeaturedImage;
  seo?: {
    title?: string;
    description?: string;
  };
  priceRange: {
    maxVariantPrice: Money;
  };
  createdAt: Date;
  updatedAt: Date;
  descriptionHtml: string;
  tags: Array<string>;
  availableForSale: boolean;
  options: Array<ProductOption>;
  variants: Array<ProductVariant>;
  images?: Array<Image>;
};

export type FeaturedImage = {
  url: string;
  width?: number;
  height?: number;
  altText: string;
};

export type ProductTag = {
  id: string;
  value: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  metadata?: Record<string, unknown> | null;
};

export type MedusaImage = {
  id: string;
  url: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: { [key: string]: string } | null;
};

export type Image = MedusaImage & {
  altText: string;
};

export type ShippingProfile = {
  id: string;
  name: string;
  type: 'default' | 'gift_card' | 'custom';
  products?: Product[];
  shipping_options?: ShippingOption[];
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: { [key: string]: any } | null;
};

export type ProductCategory = {
  id: string;
  name: string;
  description: string;
  handle: string;
  mpath: string | null;
  is_internal?: boolean;
  is_active?: boolean;
  rank?: number;
  category_children?: ProductCategory[];
  parent_category_id?: string | null;
  parent_category?: ProductCategory | null;
  products?: Product[];
  created_at: string;
  updated_at: string;
  metadata?: { [key: string]: string } | null;
};

export type MedusaProductVariant = {
  id: string;
  title?: string;
  product_id: string;
  product?: Product;
  prices?: MoneyAmount[];
  sku?: string;
  barcode?: string | null;
  ean?: string | null;
  upc?: string | null;
  variant_rank?: number | null;
  inventory_quantity: number;
  allow_backorder: boolean;
  manage_inventory: boolean;
  hs_code?: string | null;
  origin_country?: string | null;
  mid_code?: string | null;
  material?: string | null;
  weight?: number | null;
  length?: number | null;
  height?: number | null;
  width?: number | null;
  options?: ProductOptionValue[];
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  purchasable?: boolean;
};

export type ProductVariant = MedusaProductVariant & {
  availableForSale: boolean;
  selectedOptions: SelectedOption[];
  price: Money;
};

export type SelectedOption = {
  name: string;
  value: string;
};

export type MedusaProductOption = {
  id: string;
  title: string;
  values?: ProductOptionValue[];
  product_id: string;
  product?: Product | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, any> | null;
};

export type ProductOption = Omit<MedusaProductOption, 'values'> & {
  availableForSale: boolean;
  name: string;
  values: string[];
};

export type ProductOptionValue = {
  id: string;
  value: string;
  option_id: string;
  option?: MedusaProductOption | null;
  variant_id: string;
  variant?: MedusaProductVariant | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, any> | null;
};

export type Money = {
  amount: string;
  currencyCode: string;
};

export type MoneyAmount = {
  id: string;
  currency_code: string;
  currency?: Currency | null;
  amount: number;
  min_quantity?: number | null;
  max_quantity?: number | null;
  price_list_id?: string | null;
  price_list?: PriceList | null;
  variant_id?: string | null;
  variant?: ProductVariant | null;
  region_id?: string | null;
  region?: Region | null;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};

export type Currency = {
  code: string;
  symbol: string;
  symbol_native: string;
  name: string;
  includes_tax?: boolean;
};

export type PriceList = {
  id: string;
  name: string;
  description: string;
  type?: 'sale' | 'override';
  status?: 'active' | 'draft';
  starts_at?: string | null;
  ends_at?: string | null;
  customer_groups?: CustomerGroup[];
  prices?: MoneyAmount[];
  includes_tax?: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
};

export type CustomerGroup = {
  id: string;
  name: string;
};

type ShippingOption = {
  id: string;
  name: string;
  region_id: string;
  region?: Region | null;
  profile_id: string;
  profile?: ShippingProfile | null;
  provider_id: string;
  provider?: FulfillmentProvider | null;
  price_type: 'flat_rate' | 'calculated';
  amount?: number | null;
  is_return: boolean;
  admin_only: boolean;
  requirements?: ShippingOptionRequirement[];
  data: Record<string, unknown>;
  includes_tax: boolean;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type Region = {
  id: string;
  name: string;
  country_code: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, unknown> | null;
  currency_code: string;
  tax_code: string;
  tax_rate: number;
};

export type FulfillmentProvider = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type ShippingOptionRequirement = {
  id: string;
  requirement_id: string;
  value: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  metadata?: Record<string, unknown> | null;
};

export type MedusaCart = {
  id: string;
  email?: string;
  billing_address_id: string;
  // billing_address?: Address;
  // shipping_address_id?: string;
  // shipping_address?: Address;
  items?: MedusaLineItem[];
  region_id: string;
  region?: Region;
  // discounts?: Discount[];
  // gift_cards?: GiftCard[];
  customer_id?: string;
  // customer?: Customer;
  // payment_session?: PaymentSession;
  // payment_sessions?: PaymentSession[];
  payment_id?: string;
  // payment?: Payment;
  // shipping_methods?: ShippingMethod[];
  type: 'default' | 'swap' | 'draft_order' | 'payment_link' | 'claim';
  completed_at?: string;
  payment_authorized_at?: string;
  idempotency_key?: string;
  context?: Record<string, any>;
  sales_channel_id?: string;
  // sales_channel?: SalesChannel;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
  metadata?: Record<string, any>;
  shipping_total?: number;
  discount_total?: number;
  raw_discount_total?: number;
  item_tax_total?: number;
  shipping_tax_total?: number;
  tax_total?: number;
  refunded_total?: number;
  total?: number;
  subtotal?: number;
};

export type Cart = Partial<MedusaCart> & {
  lines: CartItem[];
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: Money;
    totalAmount: Money;
    totalTaxAmount: Money;
  };
};

export type Menu = {
  title: string;
  path: string;
};

export type MedusaLineItem = {
  id: string;
  cart_id?: string;
  cart?: Cart;
  order_id?: string;
  // order?: Order;
  swap_id?: string | null;
  // swap?: Swap;
  claim_order_id?: string | null;
  // claim_order?: ClaimOrder;
  // tax_lines?: LineItemTaxLine[];
  // adjustments?: LineItemAdjustment[];
  original_item_id?: string | null;
  order_edit_id?: string | null;
  // order_edit?: OrderEdit;
  title: string;
  description?: string | null;
  thumbnail?: string | null;
  is_return: boolean;
  is_giftcard: boolean;
  should_merge: boolean;
  allow_discounts: boolean;
  has_shipping?: boolean | null;
  unit_price: number;
  variant_id?: string | null;
  variant: MedusaProductVariant;
  quantity: number;
  fulfilled_quantity?: number | null;
  returned_quantity?: number | null;
  shipped_quantity?: number | null;
  refundable: number;
  subtotal: number;
  tax_total: number;
  total: number;
  original_total: number;
  original_tax_total: number;
  discount_total: number;
  raw_discount_total: number;
  gift_card_total: number;
  includes_tax: boolean;
  created_at: Date;
  updated_at: Date;
  metadata?: { [key: string]: string } | null;
};

export type CartItem = MedusaLineItem & {
  merchandise: {
    id: string;
    selectedOptions: SelectedOption[];
    product: Product;
    title: string;
  };
  cost: {
    totalAmount: Money;
  };
  quantity: number;
};

export type RegionInfo = Pick<Region, 'currency_code' | 'tax_code' | 'tax_rate'>;
export type ProductVariantEntity = ConvertDateToString<Omit<ProductVariant, 'beforeInsert'>>;
export type ProductVariantInfo = Pick<ProductVariantEntity, 'prices'>;

type ConvertDateToString<T extends {}> = {
  [P in keyof T]: T[P] extends Date ? Date | string : T[P];
};
