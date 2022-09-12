import { Product } from './product'

export interface WishlistItem {
  /**
   * The unique identifier for the item.
   */
  id: string
  /**
   * The unique identifier for the product associated with the wishlist item.
   */
  productId: string
  /**
   * The unique identifier for the product variant associated with the wishlist item.
   */
  variantId: string
  /**
   * The product associated with the wishlist item.
   */
  product: Product
}

export interface Wishlist {
  /**
   * The unique identifier for the wishlist.
   */
  id: string
  /**
   * List of items in the wishlist.
   */
  items: WishlistItem[]

  /**
   * TODO: Spree provider specific
   */
  token?: string
}

export interface WishlistItemBody {
  /**
   * The product's variant id.
   */
  variantId: string
  /**
   * The product's ID.
   */
  productId: string

  /**
   * TODO: Spree provider specific
   */
  wishlistToken?: string
}

export interface GetWishlistHook {
  data: Wishlist | null | undefined
  body: { includeProducts?: boolean }
  input: { includeProducts?: boolean }
  fetcherInput: { customerId: string; includeProducts?: boolean }
  swrState: { isEmpty: boolean }
}

export interface AddItemHook {
  data: Wishlist | null | undefined
  body: { item: WishlistItemBody }
  fetcherInput: { item: WishlistItemBody }
  actionInput: WishlistItemBody
}

export interface RemoveItemHook {
  data: Wishlist | null | undefined
  body: { itemId: string; wishlistToken?: string }
  fetcherInput: { itemId: string; wishlistToken?: string }
  actionInput: { id: string }
  input: { wishlist?: { includeProducts?: boolean } }
}

export type WishlistSchema = {
  endpoint: {
    options: {}
    handlers: {
      getWishlist: GetWishlistHook & {
        data: Wishlist | null
        body: { customerToken?: string }
      }
      addItem: AddItemHook & {
        body: { customerToken?: string }
      }
      removeItem: RemoveItemHook & {
        body: { customerToken?: string }
      }
    }
  }
}

export interface GetCustomerWishlistOperation {
  data: { wishlist?: Wishlist }
  variables: { customerId: string }
}
