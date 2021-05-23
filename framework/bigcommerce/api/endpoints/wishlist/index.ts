import type { GetAPISchema } from '@commerce/api'
import type { WishlistSchema } from '../../../types/wishlist'
import type { BigcommerceAPI } from '../..'
import getWishlist from './get-wishlist'
import addItem from './add-item'
import removeItem from './remove-item'

export type WishlistAPI = GetAPISchema<BigcommerceAPI, WishlistSchema>

export type WishlistEndpoint = WishlistAPI['endpoint']

export const handlers = { getWishlist, addItem, removeItem }
