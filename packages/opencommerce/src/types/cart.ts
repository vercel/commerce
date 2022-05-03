import * as Core from '@vercel/commerce/types/cart'
import { ProductVariant } from './product'

export * from '@vercel/commerce/types/cart'

export type Cart = Core.Cart & {
  lineItems: Core.LineItem[]
  id: string
}

export type CartItemBody = Core.CartItemBody & {
  currencyCode?: string
  variant?: ProductVariant
}

export type CartTypes = Core.CartTypes & {
  itemBody: CartItemBody
}

export type CartSchema = Core.CartSchema<CartTypes>
