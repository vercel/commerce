import type { GetAPISchema } from '..'
import type { WishlistSchema } from '../../types/wishlist'

import { parse, getInput } from '../utils'

import {
  wishlistSchema,
  addItemBodySchema,
  removeItemBodySchema,
  getWishlistBodySchema,
} from '../../schemas/whishlist'

import validateHandlers from '../utils/validate-handlers'

const wishlistEndpoint: GetAPISchema<
  any,
  WishlistSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers, config } = ctx

  validateHandlers(req, {
    GET: handlers['getWishlist'],
    POST: handlers['addItem'],
    DELETE: handlers['removeItem'],
  })

  let output
  const { cookies } = req
  const input = await getInput(req)

  const customerToken = cookies.get(config.customerCookie)
  const products = new URL(req.url).searchParams.get('products')

  // Return current wishlist info
  if (req.method === 'GET') {
    const body = getWishlistBodySchema.parse({
      customerToken,
      includeProducts: !!products,
    })
    output = await handlers['getWishlist']({ ...ctx, body })
  }

  // Add an item to the wishlist
  if (req.method === 'POST') {
    const body = addItemBodySchema.parse({ ...input, customerToken })
    output = await handlers['addItem']({ ...ctx, body })
  }

  // Remove an item from the wishlist
  if (req.method === 'DELETE') {
    const body = removeItemBodySchema.parse({ ...input, customerToken })
    output = await handlers['removeItem']({ ...ctx, body })
  }

  return output ? parse(output, wishlistSchema.optional()) : { status: 405 }
}

export default wishlistEndpoint
