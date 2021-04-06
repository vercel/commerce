import type { AquilacmsCart } from '../../../types'
import { AquilacmsApiError } from '../../utils/errors'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CartHandlers } from '..'
import { normalizeCart } from '../../../lib/normalize'

// Return current cart info
const getCart: CartHandlers['getCart'] = async ({
  res,
  body: { cartId },
  config,
}) => {
  if (cartId) {
    try {
      let result: AquilacmsCart = await config.storeApiFetch(
        `/v2/cart/${cartId}`,
        {
          method: 'POST',
          body: JSON.stringify({
            lang: 'en',
            PostBody: {
              populate: ['items.id'],
            },
          }),
        }
      )
      return res.status(200).json({ data: normalizeCart(result) })
    } catch (error) {
      if (error instanceof AquilacmsApiError && error.status === 404) {
        // Remove the cookie if it exists but the cart wasn't found
        res.setHeader('Set-Cookie', getCartCookie(config.cartCookie))
      } else {
        throw error
      }
    }
  }
  res.status(200).json({ data: null })
}

export default getCart
