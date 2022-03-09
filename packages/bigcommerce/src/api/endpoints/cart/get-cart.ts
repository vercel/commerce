import { normalizeCart } from '../../../lib/normalize'
import { BigcommerceApiError } from '../../utils/errors'
import getCartCookie from '../../utils/get-cart-cookie'
import type { BigcommerceCart } from '../../../types/cart'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res,
  body: { cartId },
  config,
}) => {
  let result: { data?: BigcommerceCart } = {}

  if (cartId) {
    try {
      result = await config.storeApiFetch(
        `/v3/carts/${cartId}?include=line_items.physical_items.options,line_items.digital_items.options`
      )
    } catch (error) {
      if (error instanceof BigcommerceApiError && error.status === 404) {
        // Remove the cookie if it exists but the cart wasn't found
        res.setHeader('Set-Cookie', getCartCookie(config.cartCookie))
      } else {
        throw error
      }
    }
  }

  res.status(200).json({
    data: result.data ? normalizeCart(result.data) : null,
  })
}

export default getCart
