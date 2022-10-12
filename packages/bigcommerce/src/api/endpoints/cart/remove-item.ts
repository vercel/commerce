import type { CartEndpoint } from '.'

import { normalizeCart } from '../../../lib/normalize'
import getCartCookie from '../../utils/get-cart-cookie'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  body: { cartId, itemId },
  config,
}) => {
  const result = await config.storeApiFetch<{ data: any } | null>(
    `/v3/carts/${cartId}/items/${itemId}?include=line_items.physical_items.options`,
    { method: 'DELETE' }
  )
  return {
    data: result?.data ? normalizeCart(result.data) : null,
    headers: {
      'Set-Cookie': result?.data
        ? // Update the cart cookie
          getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
        : // Remove the cart cookie if the cart was removed (empty items)
          getCartCookie(config.cartCookie),
    },
  }
}

export default removeItem
