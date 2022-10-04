import type { GetAPISchema } from '..'
import type { WishlistSchema } from '../../types/wishlist'

import validateHandlers from '../utils/validate-handlers'

import {
  getWishlistBodySchema,
  addItemBodySchema,
  removeItemBodySchema,
} from '../../schemas/whishlist'

const wishlistEndpoint: GetAPISchema<
  any,
  WishlistSchema
>['endpoint']['handler'] = (ctx) => {
  const { req, res, handlers, config } = ctx

  validateHandlers(req, res, {
    GET: handlers['getWishlist'],
    POST: handlers['addItem'],
    DELETE: handlers['removeItem'],
  })

  const { cookies } = req
  const customerToken = cookies[config.customerCookie]

  // Return current wishlist info
  if (req.method === 'GET') {
    const body = getWishlistBodySchema.parse({
      customerToken,
      includeProducts: !!req.query.products,
    })
    return handlers['getWishlist']({ ...ctx, body })
  }

  // Add an item to the wishlist
  if (req.method === 'POST') {
    const body = addItemBodySchema.parse({ ...req.body, customerToken })
    return handlers['addItem']({ ...ctx, body })
  }

  // Remove an item from the wishlist
  if (req.method === 'DELETE') {
    const body = removeItemBodySchema.parse({ ...req.body, customerToken })
    return handlers['removeItem']({ ...ctx, body })
  }
}

export default wishlistEndpoint
