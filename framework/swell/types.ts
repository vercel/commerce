import * as Core from '@commerce/types'
import { CheckoutLineItem } from './schema'

export type SwellCart = {
  id: string
  account_id: number
  currency: string
  tax_included_total: number
  sub_total: number
  discount_total: number
  quantity: number
  items: {
    id: string
    product: object
    price: number
    variant: boolean
    quantity: number
  }
  date_created: string
  discounts?: { id: number; amount: number }[]
  // TODO: add missing fields
}

export interface SwellProduct extends Core.Product {
  name: string
  slug: string
}

export interface SwellCustomer extends Core.Customer {
  first_name: string
  last_name: string
}

export type ShopifyCheckout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

export interface Cart extends Core.Cart {
  id: string
  lineItems: LineItem[]
}

export interface LineItem extends Core.LineItem {
  options: any[]
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
