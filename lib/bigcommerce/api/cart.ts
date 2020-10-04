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

  try {
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

      return res.status(200).json({ data: result.data ?? null })
    }

    // Create or add a product to the cart
    if (req.method === 'POST') {
      const { product } = req.body

      if (!product) {
        return res.status(400).json({
          errors: [{ message: 'Missing product' }],
        })
      }

      const options = {
        method: 'POST',
        body: JSON.stringify({
          line_items: [parseProduct(product)],
        }),
      }
      const { data } = cartId
        ? await config.storeApiFetch(`/v3/carts/${cartId}/items`, options)
        : await config.storeApiFetch('/v3/carts', options)

      // Create or update the cart cookie
      res.setHeader(
        'Set-Cookie',
        getCartCookie(name, data.id, config.cartCookieMaxAge)
      )

      return res.status(200).json({ done: { data } })
    }
  } catch (error) {
    const message =
      error instanceof BigcommerceApiError
        ? 'An unexpected error ocurred with the Bigcommerce API'
        : 'An unexpected error ocurred'

    res.status(500).json({ errors: [{ message }] })
  }
}

function getCartCookie(name: string, cartId?: string, maxAge?: number) {
  const options: CookieSerializeOptions =
    cartId && maxAge
      ? {
          maxAge,
          expires: new Date(Date.now() + maxAge * 1000),
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }
      : { maxAge: -1, path: '/' } // Removes the cookie

  return serialize(name, cartId || '', options)
}

const parseProduct = (product: any) => ({
  quantity: product.quantity,
  product_id: product.productId,
  variant_id: product.variantId,
})

export default createApiHandler(cartApi)
