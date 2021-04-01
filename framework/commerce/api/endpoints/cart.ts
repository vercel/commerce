import type { CartSchema } from '../../types/cart'
import { CommerceAPIError } from '../utils/errors'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { GetAPISchema } from '..'

const cartApi: GetAPISchema<any, CartSchema>['endpoint']['handler'] = async (
  ctx
) => {
  const { req, res, operations, config } = ctx

  if (
    !isAllowedOperation(req, res, {
      GET: operations['getCart'],
      POST: operations['addItem'],
      PUT: operations['updateItem'],
      DELETE: operations['removeItem'],
    })
  ) {
    return
  }

  const body2 = req.body
  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  try {
    // Return current cart info
    if (req.method === 'GET') {
      const body = { cartId }
      return await operations['getCart']({ ...ctx, body })
    }

    // Create or add an item to the cart
    if (req.method === 'POST') {
      const body = { ...req.body, cartId }
      return await operations['addItem']({ ...ctx, body })
    }

    // Update item in cart
    if (req.method === 'PUT') {
      const body = { ...req.body, cartId }
      return await operations['updateItem']({ ...ctx, body })
    }

    // Remove an item from the cart
    if (req.method === 'DELETE') {
      const body = { ...req.body, cartId }
      return await operations['removeItem']({ ...ctx, body })
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

export default cartApi
