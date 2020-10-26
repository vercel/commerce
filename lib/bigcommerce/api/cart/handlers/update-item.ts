import { parseCartItem } from '../../utils/parse-item'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CartHandlers } from '..'

// Return current cart info
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

  const { data } = await config.storeApiFetch(
    `/v3/carts/${cartId}/items/${itemId}`,
    {
      method: 'PUT',
      body: JSON.stringify({
        line_item: parseCartItem(item),
      }),
    }
  )

  // Update the cart cookie
  res.setHeader(
    'Set-Cookie',
    getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
  )
  res.status(200).json({ data })
}

export default updateItem
