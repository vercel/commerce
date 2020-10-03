import { serialize, CookieSerializeOptions } from 'cookie'
import isAllowedMethod from './utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
} from './utils/create-api-handler'
import { BigcommerceApiError } from './utils/errors'

type Cart = any

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

const cartApi: BigcommerceApiHandler = async (req, res, config) => {
  if (!isAllowedMethod(req, res, METHODS)) return

  const { cookies } = req
  const cartId = cookies[config.cartCookie]

  // Return current cart info
  if (req.method === 'GET') {
    let result: { data?: Cart } = {}

    try {
      result = await config.storeApiFetch(
        `/v3/carts/${cartId}?include=redirect_urls`
      )
    } catch (error) {
      if (error instanceof BigcommerceApiError && error.status === 404) {
        // Remove the cookie if it exists but the cart wasn't found
        res.setHeader('Set-Cookie', getCartCookie(name))
      } else {
        throw error
      }
    }

    return res.status(200).json({ cart: result.data ?? null })
  }
}

const ONE_DAY = 60 * 60 * 24
const MAX_AGE = ONE_DAY * 30

function getCartCookie(name: string, cartId?: string) {
  const options: CookieSerializeOptions = cartId
    ? {
        maxAge: MAX_AGE,
        expires: new Date(Date.now() + MAX_AGE * 1000),
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
      }
    : { maxAge: -1, path: '/' } // Removes the cookie

  return serialize(name, cartId || '', options)
}

export default createApiHandler(cartApi)
