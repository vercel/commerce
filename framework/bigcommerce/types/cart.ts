import * as Core from '@commerce/types/cart'

export * from '@commerce/types/cart'

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

/**
 * Extend core cart types
 */

export type Cart = Core.Cart & {
  lineItems: Core.LineItem[]
}

export type OptionSelections = {
  option_id: number
  option_value: number | string
}

export type CartItemBody = Core.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}

export type CartHooks = Core.CartHooks & {
  getCart: { data: Cart | null }
  addItem: { data: Cart; body: { item: CartItemBody } }
  updateItem: { data: Cart; body: { item: CartItemBody } }
  removeItem: { data: Cart | null }
}

export type GetCartHook = CartHooks['getCart']
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']

export type CartSchema = Core.CartSchema & {
  endpoint: {
    operations: CartOperations
  }
}

export type CartOperations = {
  getCart: GetCartHook
  addItem: AddItemHook
  updateItem: UpdateItemHook
  removeItem: RemoveItemHook
}

export type GetCartOperation = CartOperations['getCart']
export type AddItemOperation = CartOperations['addItem']
export type UpdateItemOperation = CartOperations['updateItem']
export type RemoveItemOperation = CartOperations['removeItem']
