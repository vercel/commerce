import * as Core from '@vercel/commerce/types/cart'
import {
  Checkout as CheckoutSchema,
  FulfillmentOption as FulfillmentOptionSchema,
  FulfillmentGroup as FulfillmentGroupSchema,
} from '../../schema'
import { ProductVariant } from './product'

export * from '@vercel/commerce/types/cart'

type FulfillmentOption = FulfillmentOptionSchema & {
  fulfillmentMethod?: NonNullable<FulfillmentOptionSchema['fulfillmentMethod']>
}

export type FulfillmentGroup = {
  availableFulfillmentOptions: FulfillmentOption[] | null
  selectedFulfillmentOption: FulfillmentOption | null
  data: FulfillmentGroupSchema['data']
  type: string
  _id: string
}

export type Checkout = {
  fulfillmentGroups: FulfillmentGroup[]
  summary: CheckoutSchema['summary']
}

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
