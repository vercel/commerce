import * as Core from '@vercel/commerce/types/cart'
import { Checkout } from '../../schema'
import { ProductVariant } from './product'

export * from '@vercel/commerce/types/cart'

export type Cart = Core.Cart & {
  checkout?: Checkout
}

export type CartItemBody = Core.CartItemBody & {
  currencyCode?: string
  variant?: ProductVariant
}

export type CartTypes = Core.CartTypes & {
  itemBody: CartItemBody
  cart?: Cart
}

export type CartSchema = Core.CartSchema<CartTypes>
