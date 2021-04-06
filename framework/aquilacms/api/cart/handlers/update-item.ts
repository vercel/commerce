import getCartCookie from '../../utils/get-cart-cookie'
import type { CartHandlers } from '..'
import { AquilacmsCart } from '../../../types'
import { normalizeCart } from '../../../lib/normalize'

const updateItem: CartHandlers['updateItem'] = async ({
  res,
  body: { cartId, itemId, item },
  config,
}) => {
  if (!cartId || !itemId || !item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const options = {
    method: 'PUT',
    body: JSON.stringify({
      item: {
        _id: itemId,
        quantity: item.quantity,
      },
      cartId,
    }),
  }
  const result: AquilacmsCart = await config.storeApiFetch(
    '/v2/cart/updateqty',
    options
  )

  // Update the cart cookie
  res.setHeader(
    'Set-Cookie',
    getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
  )
  res.status(200).json({ data: normalizeCart(result) })
}

export default updateItem
