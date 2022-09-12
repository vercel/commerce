import type { Discount, Image } from './common'

// TODO: This should use the same type as the `ProductVariant` type from `product.ts`
export interface ProductVariant {
  /**
   *  The unique identifier for the variant.
   */
  id: string
  /**
   * The SKU (stock keeping unit) associated with the product variant.
   */
  sku?: string
  /**
   * The product variant’s name, or the product's name.
   */
  name: string
  /**
   * The product variant’s price after all discounts are applied.
   */
  price: number
  /**
   * The product variant’s price before discounts are applied.
   */
  listPrice: number
  /**
   * Indicates if the variant is available for sale.
   */
  availableForSale?: boolean
  /**
   * Whether a customer needs to provide a shipping address when placing
   * an order for the product variant.
   */
  requiresShipping?: boolean
  /**
   * The image associated with the variant.
   */
  image?: Image
}

export interface SelectedOption {
  /**
   * The unique identifier for the option.
   */
  id?: string
  /**
   *  The product option’s name, such as "Color" or "Size".
   */
  name: string
  /**
   * The product option’s value, such as "Red" or "XL".
   */
  value: string
}

export interface LineItem {
  /**
   * The unique identifier for the line item.
   */
  id: string
  /**
   * The unique identifier for the product variant.
   */
  variantId: string
  /**
   * The unique identifier for the product, if the variant is not provided.
   */
  productId: string
  /**
   * This is usually the product's name.
   */
  name: string
  /**
   * The quantity of the product variant in the line item.
   */
  quantity: number
  /**
   * List of discounts applied to the line item.
   */
  discounts: Discount[]
  /**
   * A human-friendly unique string automatically generated from the product’s name.
   */
  path: string
  /**
   * The product variant.
   */
  variant: ProductVariant
  /**
   * List of selected options, to be used when displaying the line item, such as Color: Red, Size: XL.
   */
  options?: SelectedOption[]
}

/**
 * Shopping cart, a.k.a Checkout
 */
export interface Cart {
  /**
   * The unique identifier for the cart.
   */
  id: string
  /**
   * ID of the customer to which the cart belongs.
   */
  customerId?: string
  /**
   * The URL of the cart.
   */
  url?: string
  /**
   * The email assigned to this cart.
   */
  email?: string
  /**
   *  The date and time when the cart was created.
   */
  createdAt: string
  /**
   * The currency used for this cart */
  currency: { code: string }
  /**
   * Indicates if taxes are included in the line items.
   */
  taxesIncluded: boolean
  /**
   * List of cart line items.
   */
  lineItems: LineItem[]
  /**
   * The sum of all the pricexs of all the items in the cart.
   * Duties, taxes, shipping and discounts excluded.
   */
  lineItemsSubtotalPrice: number
  /**
   * Price of the cart before duties, shipping and taxes.*/
  subtotalPrice: number
  /**
   * The sum of all the prices of all the items in the cart.
   * Duties, taxes and discounts included.
   */
  totalPrice: number
  /**
   * Discounts that have been applied on the cart.
   */
  discounts?: Discount[]
}

/**
 * Base cart item body used for cart mutations
 */
export interface CartItemBody {
  /**
   *  The unique identifier for the product variant.
   */
  variantId: string
  /**
   *  The unique identifier for the product, if the variant is not provided.
   */
  productId?: string
  /**
   * The quantity of the product variant.
   */
  quantity?: number

  /**
   * The product variant's selected options.
   */
  optionsSelected?: SelectedOption[]
}

/**
 * Hooks for add, update & remove items from the cart.
 */
export type CartHooks = {
  getCart: GetCartHook
  addItem: AddItemHook
  updateItem: UpdateItemHook
  removeItem: RemoveItemHook
}

/**
 * Hook for getting the cart.
 */
export interface GetCartHook {
  data: Cart | null
  input: {}
  fetcherInput: { cartId?: string }
  swrState: { isEmpty: boolean }
}

/**
 * Hook for adding an item to the cart.
 */
export interface AddItemHook {
  data: Cart
  input?: CartItemBody
  fetcherInput: CartItemBody
  body: { item: CartItemBody }
  actionInput: CartItemBody
}

/**
 * Hook for updating an item in the cart.
 */
export interface UpdateItemHook {
  data: Cart | null | undefined
  input: { item?: LineItem; wait?: number }
  fetcherInput: { itemId: string; item: CartItemBody }
  body: { itemId: string; item: CartItemBody }
  actionInput: CartItemBody & { id: string }
}

/**
 * Hook for removing an item from the cart.
 */
export interface RemoveItemHook {
  data: Cart | null | undefined
  input: { item?: LineItem }
  fetcherInput: { itemId: string }
  body: { itemId: string }
  actionInput: { id: string }
}

/**
 * Cart API Schema.
 */
export type CartSchema = {
  endpoint: {
    options: {}
    handlers: CartHandlers
  }
}

/**
 * API Handlers for adding, updating & removing items from the cart.
 */
export type CartHandlers = {
  getCart: GetCartHandler
  addItem: AddItemHandler
  updateItem: UpdateItemHandler
  removeItem: RemoveItemHandler
}

/**
 * API Handler for getting the cart.
 */
export type GetCartHandler = GetCartHook & {
  body: { cartId?: string }
}

/**
 * API Handler for adding an item to the cart.
 */
export type AddItemHandler = AddItemHook & {
  body: { cartId: string }
}

/**
 * API Handler for updating an item in the cart.
 */
export type UpdateItemHandler = UpdateItemHook & {
  data: Cart
  body: { cartId: string }
}

/**
 * API Handler for removing an item from the cart.
 */
export type RemoveItemHandler = RemoveItemHook & {
  body: { cartId: string }
}
