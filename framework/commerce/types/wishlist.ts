// TODO: define this type
export type Wishlist = any

export type WishlistItemBody = {
  variantId: string
  productId: string
}

export type WishlistTypes = {
  wishlist: Wishlist
  itemBody: WishlistItemBody
}

export type WishlistSchema<T extends WishlistTypes = WishlistTypes> = {
  endpoint: {
    options: {}
    handlers: {
      getWishlist: {
        data: T['wishlist'] | null
        body: { customerToken?: string; includeProducts?: boolean }
      }
      addItem: {
        data: T['wishlist']
        body: { customerToken?: string; item: T['itemBody'] }
      }
      removeItem: {
        data: T['wishlist'] | null
        body: { customerToken?: string; itemId: string }
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
