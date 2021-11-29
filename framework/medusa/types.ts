export interface MedusaProduct {
  id: string
  title: string
  subtitle?: string
  description?: string
  handle?: string
  is_giftcard: boolean
  images: MedusaImage[]
  thumbnail?: string
  options: MedusaProductOption[]
  variants: MedusaProductVariant[]
  profile_id: string
  weight?: number
  length?: number
  height?: number
  width?: number
  hs_code?: string
  origin_country?: string
  mid_code?: string
  material?: string
  collection_id?: string
  collection?: MedusaProductCollection
  type_id?: string
  type?: MedusaProductType
  tags?: MedusaProductTag[]
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}

export interface MedusaImage {
  id: string
  url: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}

export interface MedusaProductOption {
  id: string
  title: string
  values: MedusaProductOptionValue[]
  product_id: string
  product: MedusaProduct
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}

export interface MedusaProductOptionValue {
  id: string
  value: string
  option_id: string
  option: MedusaProductOption
  variant_id: string
  variant: MedusaProductVariant
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}
export interface MedusaProductCollection {
  id: string
  title: string
  handle?: string
  products: MedusaProduct[]
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}
export interface MedusaProductType {
  id: string
  value: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}
export interface MedusaProductTag {
  id: string
  value: string
  created_at: Date
  updated_at: Date
  deleted_at: Date | null
  metadata: JSON | null
}
export interface MedusaProductVariant {
  id: string
  title: string
  product_id: string
  product: MedusaProduct
  prices: MedusaMoneyAmount[]
  sku?: string
  barcase?: string
  ean?: string
  upc?: string
  inventory_quantity: number
  allow_backorder: boolean
  manage_inventory: boolean
  hs_code?: string
  origin_country?: string
  mid_code?: string
  material?: string
  weight?: number
  length?: number
  height?: number
  width?: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
}

export interface MedusaMoneyAmount {
  id: string
  currency_code: string
  currency: MedusaCurrency
  amount: number
  sale_amount?: number
  variant_id?: string
  variant?: MedusaProductVariant
  region_id?: string
  region: MedusaRegion
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}

export interface MedusaCurrency {
  code: string
  symbol: string
  symbol_native: string
  name: string
}

export interface MedusaRegion {
  id: string
  name: string
  currency_code: string
  currency: MedusaCurrency
  tax_rate: number
  tax_code?: string
  countries: MedusaCountry[]
  payment_providers: MedusaPaymentProvider[]
  fulfillment_providers: MedusaFulfillmentProvider[]
  created_at: Date
  updated_at: Date
  deleted_at: Date
  metadata?: JSON
}
export interface MedusaPaymentProvider {
  id: string
  is_installed: boolean
}
export interface MedusaFulfillmentProvider {
  id: string
  is_installed: boolean
}
export interface MedusaCountry {
  id: number
  iso_2: string
  iso_3: string
  num_code: string
  name: string
  display_name: string
  region_id?: string
  region: MedusaRegion
}
export interface MedusaCart {
  id: string
  email?: string
  billing_address_id?: string
  billing_address?: MedusaAddress
  shipping_address_id?: string
  shipping_address?: MedusaAddress
  items: MedusaLineItem[]
  region: MedusaRegion
  discounts: MedusaDiscount[]
  gift_cards: MedusaGiftCard[]
  customer_id?: string
  customer?: MedusaCustomer
  payment_session?: MedusaPaymentSession
  payment_sessions?: MedusaPaymentSession[]
  payment_id?: string
  payment?: MedusaPayment
  shipping_methods?: MedusaShippingMethod[]
  is_swap: boolean
  type: MedusaCartType
  idempotency_key: string
  completed_at?: Date
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
  context?: JSON
  shipping_total: number
  discount_total: number
  tax_total: number
  refunded_total: number
  total: number
  subtotal: number
  refundable_amount: number
  gift_card_total: number
}
export declare enum MedusaCartType {
  DEFAULT = 'default',
  SWAP = 'swap',
  PAYMENT_LINK = 'payment_link',
}
export interface MedusaCartCreateResource {
  region_id?: string
  items?: MedusaLineItem[]
}
export interface MedusaCartUpdateResource {
  region_id?: string
  email?: string
  billing_address?: string
  shipping_addres?: MedusaAddress
}
export interface MedusaPaymentSession {
  id: string
  cart_id: string
  cart: MedusaCart
  provider_id: string
  is_selected?: boolean
  status: string
  data?: JSON
  created_at: Date
  updated_at: Date
  idempotency_key: string
}
export interface MedusaLineItem {
  id: string
  cart_id?: string
  cart?: MedusaCart
  order_id?: string
  order?: MedusaOrder
  swap_id?: string
  swap?: MedusaSwap
  title: string
  description?: string
  thumbnail?: string
  is_giftcard: boolean
  should_merge: boolean
  allow_discounts: boolean
  has_shipping: boolean
  unit_price: number
  variant_id?: string
  variant?: MedusaProductVariant
  quantity: number
  fulfilled_quantity?: number
  returned_quantity?: number
  shipped_quantity?: number
  created_at?: Date
  updated_at?: Date
  metadata?: JSON
  refundable: number
}
export interface MedusaLineItemCreatePayload {
  variant_id: string
  quantity: number
  metadata?: JSON
}
export interface MedusaLineItemUpdatePayload {
  quantity?: number
}
export interface MedusaOrder {
  id: string
  status: MedusaOrderStatus
  fulfillment_status: MedusaFulfillmentStatus
  payment_status: MedusaPaymentStatus
  display_id: number
  cart_id?: string
  cart?: MedusaCart
  customer_id?: string
  customer?: MedusaCustomer
  email: string
  billing_address_id?: string
  billing_address?: MedusaAddress
  shipping_address_id?: string
  shipping_address?: MedusaAddress
  region_id?: string
  region?: MedusaRegion
  currency_code: string
  currency: MedusaCurrency
  tax_rate: number
  discounts?: MedusaDiscount[]
  gift_cards?: MedusaGiftCard[]
  shipping_methods?: MedusaShippingMethod[]
  payments?: MedusaPayment[]
  fulfillments?: MedusaFulfillment[]
  items: MedusaLineItem[]
  canceled_at?: Date
  created_at: Date
  updated_at: Date
  metadata?: JSON
  shipping_total: number
  discount_total: number
  tax_total: number
  refunded_total: number
  total: number
  subtotal: number
  paid_total: number
  refundable_amount: number
  gift_card_total: number
}
export declare enum MedusaOrderStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  ARCHIVED = 'archived',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}
export declare enum MedusaFulfillmentStatus {
  NOT_FULFILLED = 'not_fulfilled',
  PARTIALLY_FULFILLED = 'partially_fulfilled',
  FULFILLED = 'fulfilled',
  PARTIALLY_SHIPPED = 'partially_shipped',
  SHIPPED = 'shipped',
  PARTIALLY_RETURNED = 'partially_returned',
  RETURNED = 'returned',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}
export declare enum MedusaPaymentStatus {
  NOT_PAID = 'not_paid',
  AWAITING = 'awaiting',
  CAPTURED = 'captured',
  PARTIALLY_REFUNDED = 'partially_refunded',
  REFUNDED = 'refunded',
  CANCELED = 'canceled',
  REQUIRES_ACTION = 'requires_action',
}
export interface MedusaOrderLookUpPayload {
  display_id: number
  email: string
  shipping_address?: {
    postal_code: string
  }
}
export interface MedusaFulfillment {}
export interface MedusaAddress {
  id: string
  customer_id?: string
  customer?: MedusaCustomer
  company?: string
  first_name?: string
  last_name?: string
  address_1?: string
  address_2?: string
  city?: string
  country_code?: string
  country?: MedusaCountry
  province?: string
  postal_code?: number
  phone?: string
  created_at: string
  updated_at: string
  deleted_at?: string
  metadata?: JSON
}
export interface MedusaCustomer {
  id: string
  email: string
  first_name?: string
  last_name?: string
  billing_address_id?: string
  billing_address?: MedusaAddress
  shipping_addresses?: MedusaAddress[]
  password_hash?: string
  phone?: string
  has_account: boolean
  orders?: MedusaOrder[]
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
}
export interface MedusaCustomerResetPasswordResource {
  email: string
  password: string
}
export interface MedusaCustomerGeneratePasswordTokenResource {
  email: string
}
export interface MedusaCustomerCreateResource {
  email: string
  first_name: string
  last_name: string
  password: string
  phone_number?: string
}
export interface MedusaCustomerUpdateResource {
  first_name: string
  last_name: string
  email: string
  password: string
  phone_number: string
}
export interface MedusaAuthCreateSessionResource {
  email: string
  password: string
}
export interface MedusaDiscount {
  id: string
  code: string
  is_dynamic: boolean
  rule_id: string
  rule: DiscountRule
  is_disabled: boolean
  parent_discount_id?: string
  parent_discount?: MedusaDiscount
  starts_at: Date
  ends_at?: Date
  regions: MedusaRegion[]
  usage_limit?: number
  usage_count: number
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
}
export declare enum MedusaDiscountRuleType {
  FIXED = 'fixed',
  PERCENTAGE = 'percentage',
  FREE_SHIPPING = 'free_shipping',
}
export declare enum AllocationType {
  TOTAL = 'total',
  ITEM = 'item',
}
export interface DiscountRule {
  id: string
  description?: string
  type: MedusaDiscountRuleType
  value: number
  allocation?: AllocationType
  valid_for?: MedusaProduct[]
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
}
export interface MedusaPayment {}
export interface MedusaGiftCard {
  id: string
  code: string
  value: number
  balance: number
  region_id: string
  region: MedusaRegion
  order_id: string
  order: MedusaOrder
  is_disabled: boolean
  ends_at?: Date
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
}
export interface MedusaShippingMethod {
  id: string
  shipping_option_id: string
  shipping_option: MedusaShippingOption
  order_id?: string
  order?: MedusaOrder
  cart_id?: string
  cart?: MedusaCart
  swap_id?: string
  swap?: MedusaSwap
  return_id?: string
  return_order?: MedusaReturn
  price: number
  data: JSON
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface MedusaShippingOption {
  option_id: string
  data?: JSON
}
export interface MedusaSwap {
  id: string
  fulfillment_status: MedusaFulfillmentStatus
  payment_status: MedusaPaymentStatus
  order_id?: string
  order?: MedusaOrder
  additional_items?: MedusaLineItem
  return_order?: MedusaReturn
  fulfillments?: MedusaFulfillment[]
  payment?: MedusaPayment
  shipping_address_id?: string
  shipping_address?: MedusaAddress
  shipping_methods?: MedusaShippingMethod[]
  cart_id?: string
  cart?: MedusaCart
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
  idempotency_key: string
}
export interface MedusaReturn {
  id: string
  status: MedusaReturnStatus
  items: ReturnItem[]
  swap_id?: string
  swap: MedusaSwap
  order_id?: string
  order: MedusaOrder
  shipping_method: MedusaShippingMethod
  shipping_data?: JSON
  refund_amount: number
  received_at?: Date
  created_at: Date
  updated_at: Date
  deleted_at?: Date
  metadata?: JSON
}
export interface ReturnItem {
  item_id: string
  item: MedusaLineItem
  return_id: string
  return_order: MedusaReturn
  quantity: number
  is_requested: boolean
  reason_id?: string
  reason?: MedusaReturnReason
  note?: string
  requested_quantity?: number
  received_quantity?: number
  metadata?: JSON
}
export declare enum MedusaReturnStatus {
  REQUESTED = 'requested',
  RECEIVED = 'received',
  REQUIRES_ACTION = ' requires_action',
}
export interface MedusaReturnCreateResource {
  order_id: string
  items: {
    item_id: string
    quantity: string
    reason_id?: string
    note?: string
  }
  return_shipping?: {
    option_id: string
  }
}
export interface MedusaReturnReason {
  id: string
  value: string
  label: string
  created_at: Date
  updated_at: Date
  deleted_at?: Date
}
export interface MedusaAddItemProps {
  variant_id: string
  quantity: number
}
