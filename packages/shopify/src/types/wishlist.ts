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

export type RemoveItemHook<T extends WishlistTypes = WishlistTypes> =
  Core.RemoveItemHook & {
    fetcherInput: { itemVariantId?: string | number }
    actionInput: { itemVariantId?: string | number }
  }

export type WishlistSchema<T extends WishlistTypes = WishlistTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getWishlist: Core.GetWishlistHook<T> & {
        data: T['wishlist'] | null
        body: { customerToken?: string }
      }
      addItem: Core.AddItemHook<T> & {
        body: { variables?: T['itemBody']; customerToken?: string }
      }
      removeItem: RemoveItemHook<T> & {
        body: {
          variables?: { itemId: string; itemVariantId?: string | number }
          customerToken?: string
        }
      }
    }
  }
}

export type GetCustomerWishlistOperation =
  Core.GetCustomerWishlistOperation<WishlistTypes>

export type GetWishlistHook = Core.GetWishlistHook<WishlistTypes>

export * from '@vercel/commerce/types/wishlist'
