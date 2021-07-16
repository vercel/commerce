import type { Cart as CoreCart } from '@commerce/types'
import { CheckoutLine } from './schema'

export type SaleorCheckout = {
  id: string
  webUrl: string
  lineItems: CheckoutLine[]
}

export type Cart = CoreCart.Cart & {
  lineItems: LineItem[]
}
export interface LineItem extends CoreCart.LineItem {
  options?: any[]
}

/**
 * Cart mutations
 */

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = CoreCart.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}

// export type GetCartHandlerBody = CoreCart.GetCartHandlerBody

// export type AddCartItemBody = Core.AddCartItemBody<CartItemBody>

// export type AddCartItemHandlerBody = Core.AddCartItemHandlerBody<CartItemBody>

// export type UpdateCartItemBody = Core.UpdateCartItemBody<CartItemBody>

// export type UpdateCartItemHandlerBody = Core.UpdateCartItemHandlerBody<CartItemBody>

// export type RemoveCartItemBody = Core.RemoveCartItemBody

// export type RemoveCartItemHandlerBody = Core.RemoveCartItemHandlerBody
