import type { WishlistSchema } from '../../types/wishlist'
import { CommerceAPIError } from '../utils/errors'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { GetAPISchema } from '..'

const wishlistEndpoint: GetAPISchema<
  any,
  WishlistSchema<any>
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers, config } = ctx

  if (
    !isAllowedOperation(req, res, {
      GET: handlers['getWishlist'],
      POST: handlers['addItem'],
      DELETE: handlers['removeItem'],
    })
  ) {
    return
  }

  const { cookies } = req
  const customerToken = cookies[config.customerCookie]

  try {
    // Return current wishlist info
    if (req.method === 'GET') {
      const body = {
        customerToken,
        includeProducts: req.query.products === '1',
      }
      return await handlers['getWishlist']({ ...ctx, body })
    }

    // Add an item to the wishlist
    if (req.method === 'POST') {
      const body = { ...req.body, customerToken }
      return await handlers['addItem']({ ...ctx, body })
    }

    // Remove an item from the wishlist
    if (req.method === 'DELETE') {
      const body = { ...req.body, customerToken }
      return await handlers['removeItem']({ ...ctx, body })
    }
  } catch (error) {
    console.error(error)

    const message =
      error instanceof CommerceAPIError
        ? 'An unexpected error ocurred with the Commerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export default wishlistEndpoint
