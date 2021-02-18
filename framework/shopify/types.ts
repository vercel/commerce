import * as Core from '@commerce/types'
import { CheckoutLineItem } from './schema'

export type ShopifyCheckout = {
  id: string
  webUrl: string
  lineItems: CheckoutLineItem[]
}

export interface Cart extends Core.Cart {
  id: string
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
