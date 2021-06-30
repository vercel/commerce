import * as Core from '@commerce/types/cart'
import * as Products from './product'
export * from '@commerce/types/cart'
// TODO: this type should match:
// https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/getacart#responses
export type CommercetoolsCart = {
  id: string
  version: number
  customerId: string
  customerEmail: string
  createdAt: string
  lastModifiedAt: string
  lineItems: CommercetoolsLineItems[]
  totalPrice: {
    currencyCode: string
    centAmount: number
  }
  cartState: string
  inventoryMode: string
  taxMode: string
  taxRoundingMode: string
  taxedPrice?: TaxedItemPrice
  discountCodes: discountCodes[]
}
export type TaxedItemPrice = {
  totalNet: Products.Money
  totalGross: Products.Money
}
export type CommercetoolsLineItems = {
  id: string
  productId: string
  productSlug: Products.LocalString
  name: {
    en: string
  }
  variant: Products.CommercetoolsProductVariant
  price: Products.CommerceToolsProductPrice
  totalPrice: totalPrice
  quantity: number
  state: {
    quantity: number
    state: {
      id: string
      key: string
      version: number
      createdAt: string
      lastModifiedAt: string
    }
  }
  priceMode: string
}
export type discountCodes = {
  discountCode: {
    id: string
    version: number
    createdAt: string
    lastModifiedAt: string
    code: string
    cartDiscounts: {
      id: string
      version: number
      createdAt: string
      lastModifiedAt: string
      name: string
      isActive: boolean
    }
  }
}
export type totalPrice = {
  currencyCode: string
  centAmount: number
}
/**
 * Extend core cart types
 */
export type Cart = Core.Cart & {
  lineItems: Core.LineItem[]
}
export type LineItem = Core.LineItem
export type OptionSelections = {
  option_id: number
  option_value: number | string
}
export type CartItemBody = Core.CartItemBody & {
  productId: string // The product id is always required for BC
  optionSelections?: OptionSelections
}
export type CartTypes = {
  cart: Cart
  item: Core.LineItem
  itemBody: CartItemBody
}
export type CartHooks = Core.CartHooks<CartTypes>
export type GetCartHook = CartHooks['getCart']
export type AddItemHook = CartHooks['addItem']
export type UpdateItemHook = CartHooks['updateItem']
export type RemoveItemHook = CartHooks['removeItem']
export type CartSchema = Core.CartSchema<CartTypes>
export type CartHandlers = Core.CartHandlers<CartTypes>
export type GetCartHandler = CartHandlers['getCart']
export type AddItemHandler = CartHandlers['addItem']
export type UpdateItemHandler = CartHandlers['updateItem']
export type RemoveItemHandler = CartHandlers['removeItem']
