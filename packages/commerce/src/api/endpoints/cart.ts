import type { GetAPISchema } from '..'
import type { CartSchema } from '../../types/cart'

import validateHandlers from '../utils/validate-handlers'

import {
  getCartBodySchema,
  addItemBodySchema,
  updateItemBodySchema,
  removeItemBodySchema,
} from '../../schemas/cart'

const cartEndpoint: GetAPISchema<
  any,
  CartSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, res, handlers, config } = ctx

  validateHandlers(req, res, {
    GET: handlers['getCart'],
    POST: handlers['addItem'],
    PUT: handlers['updateItem'],
    DELETE: handlers['removeItem'],
  })

  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  // Return current cart info
  if (req.method === 'GET') {
    const body = getCartBodySchema.parse({ cartId })
    return handlers['getCart']({ ...ctx, body })
  }

  // Create or add an item to the cart
  if (req.method === 'POST') {
    const body = addItemBodySchema.parse({ ...req.body, cartId })
    return handlers['addItem']({ ...ctx, body })
  }

  // Update item in cart
  if (req.method === 'PUT') {
    const body = updateItemBodySchema.parse({ ...req.body, cartId })
    return handlers['updateItem']({ ...ctx, body })
  }

  // Remove an item from the cart
  if (req.method === 'DELETE') {
    const body = removeItemBodySchema.parse({ ...req.body, cartId })
    return handlers['removeItem']({ ...ctx, body })
  }
}

export default cartEndpoint
