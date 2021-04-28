import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  ReactionCommerceApiHandler,
  ReactionCommerceHandler,
} from '../utils/create-api-handler'
import { ReactionCommerceApiError } from '../utils/errors'
import getCart from './handlers/get-cart'
import addItem from './handlers/add-item'
import type {
  Cart,
  GetCartHandlerBody,
  AddCartItemHandlerBody,
} from '../../types'

export type CartHandlers = {
  getCart: ReactionCommerceHandler<Cart, GetCartHandlerBody>
  addItem: ReactionCommerceHandler<Cart, AddCartItemHandlerBody>
}

const METHODS = ['GET', 'POST']

// TODO: a complete implementation should have schema validation for `req.body`
const cartApi: ReactionCommerceApiHandler<Cart, CartHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const cartId = cookies[config.anonymousCartTokenCookie]

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
  } catch (error) {
    console.error(error)

    const message =
      error instanceof ReactionCommerceApiError
        ? 'An unexpected error occurred with the Reaction Commerce API'
        : 'An unexpected error occurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export const handlers = { getCart, addItem }

export default createApiHandler(cartApi, handlers, {})
