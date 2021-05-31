// TODO: define this type
export type Wishlist = any

export type WishlistItemBody = {
  variantId: string | number
  productId: string
}

export type WishlistTypes = {
  wishlist: Wishlist
  itemBody: WishlistItemBody
}

export type GetWishlistHook<T extends WishlistTypes = WishlistTypes> = {
  data: T['wishlist'] | null
  body: { includeProducts?: boolean }
  input: { includeProducts?: boolean }
  fetcherInput: { customerId: string; includeProducts?: boolean }
  swrState: { isEmpty: boolean }
}

export type AddItemHook<T extends WishlistTypes = WishlistTypes> = {
  data: T['wishlist']
  body: { item: T['itemBody'] }
  fetcherInput: { item: T['itemBody'] }
  actionInput: T['itemBody']
}

export type RemoveItemHook<T extends WishlistTypes = WishlistTypes> = {
  data: T['wishlist'] | null
  body: { itemId: string }
  fetcherInput: { itemId: string }
  actionInput: { id: string }
  input: { wishlist?: { includeProducts?: boolean } }
}

export type WishlistSchema<T extends WishlistTypes = WishlistTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getWishlist: GetWishlistHook<T> & {
        data: T['wishlist'] | null
        body: { customerToken?: string }
      }
      addItem: AddItemHook<T> & {
        body: { customerToken?: string }
      }
      removeItem: RemoveItemHook<T> & {
        body: { customerToken?: string }
      }
    }
  }
}

export type GetCustomerWishlistOperation<
  T extends WishlistTypes = WishlistTypes
> = {
  data: { wishlist?: T['wishlist'] }
  variables: { customerId: string }
}
