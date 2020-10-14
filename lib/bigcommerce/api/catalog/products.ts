import isAllowedMethod from '../utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
  BigcommerceHandler,
} from '../utils/create-api-handler'
import { BigcommerceApiError } from '../utils/errors'
import getProducts from './handlers/get-products'
import { Products } from '../operations/get-all-products'

export type SearchProductsData = {
  products: Products
  found: boolean
}

export type ProductsHandlers = {
  getProducts: BigcommerceHandler<
    SearchProductsData,
    { search?: 'string'; category?: string; brand?: string }
  >
}

const METHODS = ['GET']

// TODO: a complete implementation should have schema validation for `req.body`
const cartApi: BigcommerceApiHandler<
  SearchProductsData,
  ProductsHandlers
> = async (req, res, config, handlers) => {
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
