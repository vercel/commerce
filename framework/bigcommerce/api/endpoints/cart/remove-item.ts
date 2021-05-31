import { normalizeCart } from '../../../lib/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CartEndpoint } from '.'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
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

  const result = await config.storeApiFetch<{ data: any } | null>(
    `/v3/carts/${cartId}/items/${itemId}?include=line_items.physical_items.options`,
    { method: 'DELETE' }
  )
  const data = result?.data ?? null

  res.setHeader(
    'Set-Cookie',
    data
      ? // Update the cart cookie
        getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
      : // Remove the cart cookie if the cart was removed (empty items)
        getCartCookie(config.cartCookie)
  )
  res.status(200).json({ data: data && normalizeCart(data) })
}

export default removeItem
