import { Product } from '@vercel/commerce/types/product'
import * as Core from '@vercel/commerce/types/wishlist'
import { Customer } from '../../admin-schema'

export * from '@vercel/commerce/types/wishlist'

export type WishlistItem = NonNullable<Core.WishlistItemBody> & {
  product?: Product
}

export type Wishlist = {
  id: string
  items?: WishlistItem[]
}

export type WishlistTypes = {
  wishlist: Wishlist
  itemBody: Core.WishlistItemBody
  customer: Customer
}

export type WishlistSchema = Core.WishlistSchema<WishlistTypes>
export type GetCustomerWishlistOperation =
  Core.GetCustomerWishlistOperation<WishlistTypes>

export type GetWishlistHook = Core.GetWishlistHook<WishlistTypes>

export * from '@vercel/commerce/types/wishlist'
