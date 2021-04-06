import getCartCookie from '../../utils/get-cart-cookie'
import type { CartHandlers } from '..'
import { AquilacmsCart } from '../../../types'
import { normalizeCart } from '../../../lib/normalize'

const removeItem: CartHandlers['removeItem'] = async ({
  res,
  body: { cartId, itemId },
  config,
}) => {
  if (!cartId || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const result: AquilacmsCart = await config.storeApiFetch(
    `/v2/cart/${cartId}/item/${itemId}`,
    {
      method: 'DELETE',
    }
  )
  let data = normalizeCart(result) ?? null

  res.setHeader(
    'Set-Cookie',
    data
      ? // Update the cart cookie
        getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
      : // Remove the cart cookie if the cart was removed (empty items)
        getCartCookie(config.cartCookie)
  )
  res.status(200).json({ data })
}

export default removeItem
