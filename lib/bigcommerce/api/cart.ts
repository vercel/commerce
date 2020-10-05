import { serialize, CookieSerializeOptions } from 'cookie'
import isAllowedMethod from './utils/is-allowed-method'
import createApiHandler, {
  BigcommerceApiHandler,
} from './utils/create-api-handler'
import { BigcommerceApiError } from './utils/errors'

export type Item = {
  productId: number
  variantId: number
  quantity?: number
}

// TODO: this type should match:
// https://developer.bigcommerce.com/api-reference/cart-checkout/server-server-cart-api/cart/getacart#responses
export type Cart = {
  id: string
  parent_id?: string
  customer_id: number
  email: string
  currency: { code: string }
  tax_included: boolean
  base_amount: number
  discount_amount: number
  cart_amount: number
  // TODO: add missing fields
}

const METHODS = ['GET', 'POST', 'PUT', 'DELETE']

const cartApi: BigcommerceApiHandler<Cart> = async (req, res, config) => {
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
          res.setHeader('Set-Cookie', getCartCookie(config.cartCookie))
        } else {
          throw error
        }
      }

      return res.status(200).json({ data: result.data ?? null })
    }

    // Create or add a product to the cart
    if (req.method === 'POST') {
      const item: Item | undefined = req.body?.item

      if (!item) {
        return res.status(400).json({
          data: null,
          errors: [{ message: 'Missing product' }],
        })
      }

      const options = {
        method: 'POST',
        body: JSON.stringify({
          line_items: [parseItem(item)],
        }),
      }
      const { data } = cartId
        ? await config.storeApiFetch(`/v3/carts/${cartId}/items`, options)
        : await config.storeApiFetch('/v3/carts', options)

      console.log('API DATA', data)

      // Create or update the cart cookie
      res.setHeader(
        'Set-Cookie',
        getCartCookie(config.cartCookie, data.id, config.cartCookieMaxAge)
      )

      return res.status(200).json({ data })
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

function getCartCookie(name: string, cartId?: string, maxAge?: number) {
  const options: CookieSerializeOptions =
    cartId && maxAge
      ? {
          maxAge,
          expires: new Date(Date.now() + maxAge * 1000),
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }
      : { maxAge: -1, path: '/' } // Removes the cookie

  return serialize(name, cartId || '', options)
}

const parseItem = (item: Item) => ({
  quantity: item.quantity || 1,
  product_id: item.productId,
  variant_id: item.variantId,
})

export default createApiHandler(cartApi)
