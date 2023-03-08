import { GetAPISchema, createEndpoint } from '@vercel/commerce/api'
import wishlistEndpoint from '@vercel/commerce/api/endpoints/wishlist'
import type { WishlistSchema } from '@vercel/commerce/types/wishlist'
import type { BigcommerceAPI } from '../..'
import getWishlist from './get-wishlist'
import addItem from './add-item'
import removeItem from './remove-item'

export type WishlistAPI = GetAPISchema<BigcommerceAPI, WishlistSchema>

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
