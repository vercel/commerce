export interface Cart {
  items: CartItem[];
  coupons: Coupon[];
  fees: any[];
  totals: Totals;
  shipping_address: IngAddress;
  billing_address: IngAddress;
  needs_payment: boolean;
  needs_shipping: boolean;
  payment_requirements: string[];
  has_calculated_shipping: boolean;
  shipping_rates: ShippingRate[];
  items_count: number;
  items_weight: number;
  cross_sells: any[];
  errors: any[];
  payment_methods: string[];
  extensions: Extensions;
}

export interface CartItem {
  key: string;
  id: number;
  quantity: number;
  quantity_limits: QuantityLimits;
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Image[];
  variation: any[];
  item_data: any[];
  prices: Prices;
  totals: Totals;
  catalog_visibility: string;
  extensions: Extensions;
}

export interface IngAddress {
  first_name: string;
  last_name: string;
  company: string;
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
  email?: string;
  phone: string;
}

export interface Coupon {
  code: string;
  discount_type: string;
  totals: CouponTotals;
}

export interface CouponTotals {
  total_discount: string;
  total_discount_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface Extensions {}

export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  raw_prices: RawPrices;
}

export interface RawPrices {
  precision: number;
  price: string;
  regular_price: string;
  sale_price: string;
}

export interface QuantityLimits {
  minimum: number;
  maximum: number;
  multiple_of: number;
  editable: boolean;
}

export interface ItemTotals {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface ShippingRate {
  package_id: number;
  name: string;
  destination: Destination;
  items: ShippingRateItem[];
  shipping_rates: ShippingRateShippingRate[];
}

export interface Destination {
  address_1: string;
  address_2: string;
  city: string;
  state: string;
  postcode: string;
  country: string;
}

export interface ShippingRateItem {
  key: string;
  name: string;
  quantity: number;
}

export interface ShippingRateShippingRate {
  rate_id: string;
  name: string;
  description: string;
  delivery_time: string;
  price: string;
  taxes: string;
  instance_id: number;
  method_id: string;
  meta_data: MetaDatum[];
  selected: boolean;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface MetaDatum {
  key: string;
  value: string;
}

export interface Totals {
  total_items: string;
  total_items_tax: string;
  total_fees: string;
  total_fees_tax: string;
  total_discount: string;
  total_discount_tax: string;
  total_shipping: string;
  total_shipping_tax: string;
  total_price: string;
  total_tax: string;
  tax_lines: TaxLine[];
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}

export interface TaxLine {
  name: string;
  price: string;
  rate: string;
}

export interface Extensions {}

export interface Image {
  id: number;
  src: string;
  thumbnail: string;
  srcset: string;
  sizes: string;
  name: string;
  alt: string;
}

export interface Prices {
  price: string;
  regular_price: string;
  sale_price: string;
  price_range: null;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
  raw_prices: RawPrices;
}

export interface RawPrices {
  precision: number;
  price: string;
  regular_price: string;
  sale_price: string;
}

export interface QuantityLimits {
  minimum: number;
  maximum: number;
  multiple_of: number;
  editable: boolean;
}

export interface Totals {
  line_subtotal: string;
  line_subtotal_tax: string;
  line_total: string;
  line_total_tax: string;
  currency_code: string;
  currency_symbol: string;
  currency_minor_unit: number;
  currency_decimal_separator: string;
  currency_thousand_separator: string;
  currency_prefix: string;
  currency_suffix: string;
}
