import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import wishlistEndpoint from '@vercel/commerce/api/endpoints/wishlist'
import type { WishlistSchema } from '../../../types/wishlist'
import type { ShopifyAPI } from '../..'
import addItem from './add-item'
import removeItem from './remove-item'
import getWishlist from './get-wishlist'

export type WishlistAPI = GetAPISchema<ShopifyAPI, WishlistSchema>

export type WishlistEndpoint = WishlistAPI['endpoint']

export const handlers: WishlistEndpoint['handlers'] = {
  getWishlist,
  addItem,
  removeItem,
}

const wishlistApi = createEndpoint<WishlistAPI>({
  handler: wishlistEndpoint,
  handlers,
})

export default wishlistApi
