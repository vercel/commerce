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
   * Some providers require a token to add an item to a wishlist
   */
  token?: string
}

export interface WishlistItemBody {
  /**
   * The unique identifier for the product variant to associate with the wishlist.
   */
  variantId: string
  /**
   * The unique identifier for the product to associate with the wishlist.
   */
  productId: string
  /**
   * Some providers require to provide a token to make a request
   */
  wishlistToken?: string
}

export type GetWishlistHook = {
  data: Wishlist | null | undefined
  body: { includeProducts?: boolean }
  input: { includeProducts?: boolean }
  fetcherInput: { customerId: string; includeProducts?: boolean }
  swrState: { isEmpty: boolean }
}

export type AddItemHook = {
  data: Wishlist | null | undefined
  body: { item: WishlistItemBody }
  fetcherInput: { item: WishlistItemBody }
  actionInput: WishlistItemBody
}

export type RemoveItemHook = {
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

export type GetCustomerWishlistOperation = {
  data: { wishlist?: Wishlist }
  variables: { customerId: string }
}
