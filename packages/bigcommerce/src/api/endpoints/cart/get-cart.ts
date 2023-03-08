import type { CartEndpoint } from '.'
import type { BigcommerceCart } from '../../../types'

import getCartCookie from '../../utils/get-cart-cookie'

import { normalizeCart } from '../../../lib/normalize'
import { BigcommerceApiError } from '../../utils/errors'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  body: { cartId },
  config,
}) => {
  if (cartId) {
    try {
      const result = await config.storeApiFetch<{
        data?: BigcommerceCart
      } | null>(
        `/v3/carts/${cartId}?include=line_items.physical_items.options,line_items.digital_items.options`
      )

      return {
        data: result?.data ? normalizeCart(result.data) : null,
      }
    } catch (error) {
      if (error instanceof BigcommerceApiError && error.status === 404) {
        return {
          headers: { 'Set-Cookie': getCartCookie(config.cartCookie) },
        }
      } else {
        throw error
      }
    }
  }

  return {
    data: null,
  }
}

export default getCart
