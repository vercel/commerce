import type { Wishlist as BCWishlist } from '../../bigcommerce/api/wishlist'
import type { Customer as BCCustomer } from '../../bigcommerce/api/customers'
import type { SearchProductsData as BCSearchProductsData } from '../../bigcommerce/api/catalog/products'

export * from './cart'
export * from './common'

// TODO: Properly define this type
export interface Wishlist extends BCWishlist {}

// TODO: Properly define this type
export interface Customer extends BCCustomer {}

// TODO: Properly define this type
export interface SearchProductsData extends BCSearchProductsData {}

/**
 * Cart mutations
 */

// Base cart item body used for cart mutations
export type CartItemBody = {
  variantId: string
  productId?: string
  quantity?: number
}

// Body used by the `getCart` operation handler
export type GetCartHandlerBody = {
  cartId?: string
}

// Body used by the add item to cart operation
export type AddCartItemBody<T extends CartItemBody> = {
  item: T
}

// Body expected by the add item to cart operation handler
export type AddCartItemHandlerBody<T extends CartItemBody> = Partial<
  AddCartItemBody<T>
> & {
  cartId?: string
}

// Body used by the update cart item operation
export type UpdateCartItemBody<T extends CartItemBody> = {
  itemId: string
  item: T
}

// Body expected by the update cart item operation handler
export type UpdateCartItemHandlerBody<T extends CartItemBody> = Partial<
  UpdateCartItemBody<T>
> & {
  cartId?: string
}

// Body used by the remove cart item operation
export type RemoveCartItemBody = {
  itemId: string
}

// Body expected by the remove cart item operation handler
export type RemoveCartItemHandlerBody = Partial<RemoveCartItemBody> & {
  cartId?: string
}

/**
 * Temporal types
 */

interface Entity {
  id: string | number
  [prop: string]: any
}

export interface Product2 {
  id: string
  name: string
  description: string
  sku?: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant2[]
  price: ProductPrice
  options: ProductOption[]
}

export interface Product extends Entity {
  name: string
  description: string
  slug?: string
  path?: string
  images: ProductImage[]
  variants: ProductVariant2[]
  price: ProductPrice
  options: ProductOption[]
  sku?: string
}

interface ProductOption extends Entity {
  displayName: string
  values: ProductOptionValues[]
}

interface ProductOptionValues {
  label: string
  hexColors?: string[]
}

interface ProductImage {
  url: string
  alt?: string
}

interface ProductVariant2 {
  id: string | number
  options: ProductOption[]
}

interface ProductPrice {
  value: number
  currencyCode: 'USD' | 'ARS' | string | undefined
  retailPrice?: number
  salePrice?: number
  listPrice?: number
  extendedSalePrice?: number
  extendedListPrice?: number
}
