import type { definitions } from '../definitions/catalog'
import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from '../utils/create-api-handler'
import { BigcommerceApiError } from '../utils/errors'
import getProducts from './handlers/get-products'

export type Product = definitions['product_Full']

export type ProductsHandlers = {
  getProducts: BigcommerceHandler<Product[], { search?: 'string' }>
}

const METHODS = ['GET']

// TODO: a complete implementation should have schema validation for `req.body`
const cartApi: BigcommerceApiHandler<Product[], ProductsHandlers> = async (
  req,
  res,
  config,
  handlers
) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  try {
    // Return current cart info
    if (req.method === 'GET') {
      const body = req.query
      return await handlers['getProducts']({ req, res, config, body })
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

export const handlers = { getProducts }

export default createApiHandler(cartApi, handlers)
