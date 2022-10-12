import type { GetAPISchema } from '..'
import type { CartSchema } from '../../types/cart'

import parse from '../utils/parse-output'
import validateHandlers from '../utils/validate-handlers'

import { getInput } from '../utils'

import {
  getCartBodySchema,
  addItemBodySchema,
  updateItemBodySchema,
  removeItemBodySchema,
  cartSchema,
} from '../../schemas/cart'

const cartEndpoint: GetAPISchema<
  any,
  CartSchema
>['endpoint']['handler'] = async (ctx) => {
  const { req, handlers, config } = ctx

  validateHandlers(req, {
    GET: handlers['getCart'],
    POST: handlers['addItem'],
    PUT: handlers['updateItem'],
    DELETE: handlers['removeItem'],
  })

  const input = await getInput(req)

  let output
  const { cookies } = req
  const cartId = cookies.get(config.cartCookie)

  // Return current cart info
  if (req.method === 'GET') {
    const body = getCartBodySchema.parse({ cartId })
    output = await handlers['getCart']({ ...ctx, body })
  }

  // Create or add an item to the cart
  if (req.method === 'POST') {
    const body = addItemBodySchema.parse({ ...input, cartId })
    output = await handlers['addItem']({ ...ctx, body })
  }

  // Update item in cart
  if (req.method === 'PUT') {
    const body = updateItemBodySchema.parse({ ...input, cartId })
    output = await handlers['updateItem']({ ...ctx, body })
  }

  // Remove an item from the cart
  if (req.method === 'DELETE') {
    const body = removeItemBodySchema.parse({ ...input, cartId })
    return await handlers['removeItem']({ ...ctx, body })
  }

  return output ? parse(output, cartSchema.nullish()) : { status: 405 }
}

export default cartEndpoint
