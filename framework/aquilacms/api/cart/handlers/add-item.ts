import getCartCookie from '../../utils/get-cart-cookie'
import type { CartHandlers } from '..'
import { AquilacmsCart } from '../../../types'
import { normalizeCart } from '../../../lib/normalize'

const addItem: CartHandlers['addItem'] = async ({
  res,
  body: { cartId, item },
  config,
}) => {
  if (!item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Missing item' }],
    })
  }
  if (!item.quantity) item.quantity = 1
  const result: AquilacmsCart = await config.storeApiFetch('/v2/cart/item', {
    method: 'PUT',
    body: JSON.stringify({
      cartId,
      item: {
        id: item.productId,
        quantity: item.quantity,
      },
    }),
  })

  // Create or update the cart cookie
  res.setHeader(
    'Set-Cookie',
    getCartCookie(config.cartCookie, result._id, config.cartCookieMaxAge)
  )
  res.status(200).json({ data: normalizeCart(result) })
}

export default addItem
