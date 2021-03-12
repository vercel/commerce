import type { APIEndpoint, APIHandler } from '../utils/types'
import isAllowedMethod from '../utils/is-allowed-method'

import cn from 'classnames'
import isAllowedOperation from '../utils/is-allowed-operation'
import type { APIProvider, CartHandlers } from '..'

cn({ yo: true })

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

const cartApi: APIEndpoint<APIProvider, CartHandlers> = async (ctx) => {
  if (
    !isAllowedOperation(ctx.req, ctx.res, {
      GET: ctx.handlers['getCart'],
    })
  ) {
    return
  }

  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  try {
    // Return current cart info
    if (req.method === 'GET') {
      const body = { cartId }
      return await handlers['getCart']({ req, res, config, body })
    }

    // Create or add an item to the cart
    if (req.method === 'POST') {
      const body = { ...req.body, cartId }
      return await handlers['addItem']({ req, res, config, body })
    }

    // Update item in cart
    if (req.method === 'PUT') {
      const body = { ...req.body, cartId }
      return await handlers['updateItem']({ req, res, config, body })
    }

    // Remove an item from the cart
    if (req.method === 'DELETE') {
      const body = { ...req.body, cartId }
      return await handlers['removeItem']({ req, res, config, body })
    }
  } catch (error) {
    console.error(error)

    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}
