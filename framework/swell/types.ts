import * as Core from '@commerce/types'
import { CheckoutLineItem } from './schema'

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
}

export interface ProductOptionValue {
  label: string
  hexColors?: string[]
  id: string
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

export interface SwellCustomer extends Core.Customer {
  first_name: string
  last_name: string
}

export type SwellCheckout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

export interface Cart extends Core.Cart {
  id: string
  lineItems: LineItem[]
}

export interface LineItem extends Core.LineItem {
  options?: any[]
}

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}

export type GetCartHandlerBody = Core.GetCartHandlerBody

export type AddCartItemBody = Core.AddCartItemBody<CartItemBody>

export type AddCartItemHandlerBody = Core.AddCartItemHandlerBody<CartItemBody>

export type UpdateCartItemBody = Core.UpdateCartItemBody<CartItemBody>

export type UpdateCartItemHandlerBody = Core.UpdateCartItemHandlerBody<CartItemBody>

export type RemoveCartItemBody = Core.RemoveCartItemBody

export type RemoveCartItemHandlerBody = Core.RemoveCartItemHandlerBody
