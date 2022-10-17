import type { CheckoutLineItem } from '../schema'

export type SwellImage = {
  file: {
    url: String
    height: Number
    width: Number
  }
  id: string
}

export type CartLineItem = {
  id: string
  product: SwellProduct
  price: number
  variant: {
    name: string | null
    sku: string | null
    id: string
  }
  quantity: number
}

export type SwellCart = {
  id: string
  account_id: number
  currency: string
  tax_included_total: number
  sub_total: number
  grand_total: number
  discount_total: number
  quantity: number
  items: CartLineItem[]
  date_created: string
  discounts?: { id: number; amount: number }[] | null
  // TODO: add missing fields
}

export type SwellVariant = {
  id: string
  option_value_ids: string[]
  name: string
  price?: number
  stock_status?: string
  __type?: 'MultipleChoiceOption' | undefined
}

export interface SwellProductOptionValue {
  id: string
  label: string
  hexColors?: string[]
}

export interface ProductOptionValue {
  label: string
  hexColors?: string[]
}

export type ProductOptions = {
  id: string
  name: string
  variant: boolean
  values: ProductOptionValue[]
  required: boolean
  active: boolean
  attribute_id: string
}

export interface SwellProduct {
  id: string
  description: string
  name: string
  slug: string
  currency: string
  price: number
  images: any[]
  options: any[]
  variants: any[]
}

export type SwellCustomer = any

export type SwellCheckout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}
