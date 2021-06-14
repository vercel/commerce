import type { Discount, Measurement, Image } from './common'

export type SelectedOption = {
  // The option's id.
  id?: string
  // The product option’s name.
  name: string
  /// The product option’s value.
  value: string
}

export type LineItem = {
  id: string
  variantId: string
  productId: string
  name: string
  quantity: number
  discounts: Discount[]
  // A human-friendly unique string automatically generated from the product’s name
  path: string
  variant: ProductVariant
  options?: SelectedOption[]
}

export type ProductVariant = {
  id: string
  // The SKU (stock keeping unit) associated with the product variant.
  sku: string
  // The product variant’s title, or the product's name.
  name: string
  // Whether a customer needs to provide a shipping address when placing
  // an order for the product variant.
  requiresShipping: boolean
  // The product variant’s price after all discounts are applied.
  price: number
  // Product variant’s price, as quoted by the manufacturer/distributor.
  listPrice: number
  // Image associated with the product variant. Falls back to the product image
  // if no image is available.
  image?: Image
  // Indicates whether this product variant is in stock.
  isInStock?: boolean
  // Indicates if the product variant is available for sale.
  availableForSale?: boolean
  // The variant's weight. If a weight was not explicitly specified on the
  // variant this will be the product's weight.
  weight?: Measurement
  // The variant's height. If a height was not explicitly specified on the
  // variant, this will be the product's height.
  height?: Measurement
  // The variant's width. If a width was not explicitly specified on the
  // variant, this will be the product's width.
  width?: Measurement
  // The variant's depth. If a depth was not explicitly specified on the
  // variant, this will be the product's depth.
  depth?: Measurement
}

// Shopping cart, a.k.a Checkout
export type Cart = {
  id: string
  // ID of the customer to which the cart belongs.
  customerId?: string
  // The email assigned to this cart
  email?: string
  // The date and time when the cart was created.
  createdAt: string
  // The currency used for this cart
  currency: { code: string }
  // Specifies if taxes are included in the line items.
  taxesIncluded: boolean
  lineItems: LineItem[]
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes, shipping and discounts excluded.
  lineItemsSubtotalPrice: number
  // Price of the cart before duties, shipping and taxes.
  subtotalPrice: number
  // The sum of all the prices of all the items in the cart.
  // Duties, taxes and discounts included.
  totalPrice: number
  // Discounts that have been applied on the cart.
  discounts?: Discount[]
}

/**
 * Base cart item body used for cart mutations
 */
export type CartItemBody = {
  variantId: string
  productId?: string
  quantity?: number
}

/**
 * Hooks schema
 */

export type CartTypes = {
  cart?: Cart
  item: LineItem
  itemBody: CartItemBody
}

export type CartHooks<T extends CartTypes = CartTypes> = {
  getCart: GetCartHook<T>
  addItem: AddItemHook<T>
  updateItem: UpdateItemHook<T>
  removeItem: RemoveItemHook<T>
}

export type GetCartHook<T extends CartTypes = CartTypes> = {
  data: T['cart'] | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

export type AddItemHook<T extends CartTypes = CartTypes> = {
  data: T['cart']
  input?: T['itemBody']
  fetcherInput: T['itemBody']
  body: { item: T['itemBody'] }
  actionInput: T['itemBody']
}

export type UpdateItemHook<T extends CartTypes = CartTypes> = {
  data: T['cart'] | null
  input: { item?: T['item']; wait?: number }
  fetcherInput: { itemId: string; item: T['itemBody'] }
  body: { itemId: string; item: T['itemBody'] }
  actionInput: T['itemBody'] & { id: string }
}

export type RemoveItemHook<T extends CartTypes = CartTypes> = {
  data: T['cart'] | null
  input: { item?: T['item'] }
  fetcherInput: { itemId: string }
  body: { itemId: string }
  actionInput: { id: string }
}

/**
 * API Schema
 */

export type CartSchema<T extends CartTypes = CartTypes> = {
  endpoint: {
    options: {}
    handlers: CartHandlers<T>
  }
}

export type CartHandlers<T extends CartTypes = CartTypes> = {
  getCart: GetCartHandler<T>
  addItem: AddItemHandler<T>
  updateItem: UpdateItemHandler<T>
  removeItem: RemoveItemHandler<T>
}

export type GetCartHandler<T extends CartTypes = CartTypes> = GetCartHook<T> & {
  body: { cartId?: string }
}

export type AddItemHandler<T extends CartTypes = CartTypes> = AddItemHook<T> & {
  body: { cartId: string }
}

export type UpdateItemHandler<T extends CartTypes = CartTypes> =
  UpdateItemHook<T> & {
    data: T['cart']
    body: { cartId: string }
  }

export type RemoveItemHandler<T extends CartTypes = CartTypes> =
  RemoveItemHook<T> & {
    body: { cartId: string }
  }
