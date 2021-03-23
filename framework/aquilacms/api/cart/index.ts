import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  AquilacmsApiHandler,
  AquilacmsHandler,
} from '../utils/create-api-handler'
import { AquilacmsApiError } from '../utils/errors'
import getCart from './handlers/get-cart'
import addItem from './handlers/add-item'
import updateItem from './handlers/update-item'
import removeItem from './handlers/remove-item'
import type {
  AquilacmsCart,
  GetCartHandlerBody,
  AddCartItemHandlerBody,
  UpdateCartItemHandlerBody,
  RemoveCartItemHandlerBody,
} from '../../types'

export type CartHandlers = {
  getCart: AquilacmsHandler<AquilacmsCart, GetCartHandlerBody>
  addItem: AquilacmsHandler<AquilacmsCart, AddCartItemHandlerBody>
  updateItem: AquilacmsHandler<AquilacmsCart, UpdateCartItemHandlerBody>
  removeItem: AquilacmsHandler<AquilacmsCart, RemoveCartItemHandlerBody>
}

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

// TODO: a complete implementation should have schema validation for `req.body`
const cartApi: AquilacmsApiHandler<AquilacmsCart, CartHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

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
      error instanceof AquilacmsApiError
        ? 'An unexpected error ocurred with the Aquilacms API'
        : 'An unexpected error ocurred'

    res.status(500).json({ data: null, errors: [{ message }] })
  }
}

export const handlers = { getCart, addItem, updateItem, removeItem }

export default createApiHandler(cartApi, handlers, {})
