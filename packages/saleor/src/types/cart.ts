import * as Core from '@vercel/commerce/types/cart'

export * from '@vercel/commerce/types/cart'

export type SaleorCart = {}

/**
 * Extend core cart types
 */

export type Cart = Core.Cart & {
  lineItems: Core.LineItem[]
  url?: string
}

export type CartHooks = Core.CartHooks

export type GetCartHook = CartHooks['getCart']
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']

export type CartSchema = Core.CartSchema

export type CartHandlers = Core.CartHandlers

export type GetCartHandler = CartHandlers['getCart']
export type AddItemHandler = CartHandlers['addItem']
export type UpdateItemHandler = CartHandlers['updateItem']
export type RemoveItemHandler = CartHandlers['removeItem']
