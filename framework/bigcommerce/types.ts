import * as Core from '@commerce/types'

// TODO: this type should match:
// https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/getacart#responses
export type BigcommerceCart = {
  id: string
  parent_id?: string
  customer_id: number
  email: string
  currency: { code: string }
  tax_included: boolean
  base_amount: number
  discount_amount: number
  cart_amount: number
  line_items: {
    custom_items: any[]
    digital_items: any[]
    gift_certificates: any[]
    physical_items: any[]
  }
  created_time: string
  discounts?: { id: number; discounted_amount: number }[]
  // TODO: add missing fields
}

export interface Cart extends Core.Cart {
  lineItems: LineItem[]
}

export interface LineItem extends Core.LineItem {}

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export interface CartItemBody extends Core.CartItemBody {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}

export interface GetCartHandlerBody extends Core.GetCartHandlerBody {}

export interface AddCartItemBody extends Core.AddCartItemBody<CartItemBody> {}

export interface AddCartItemHandlerBody
  extends Core.AddCartItemHandlerBody<CartItemBody> {}

export interface UpdateCartItemBody
  extends Core.UpdateCartItemBody<CartItemBody> {}

export interface UpdateCartItemHandlerBody
  extends Core.UpdateCartItemHandlerBody<CartItemBody> {}

export interface RemoveCartItemBody extends Core.RemoveCartItemBody {}

export interface RemoveCartItemHandlerBody
  extends Core.RemoveCartItemHandlerBody {}
