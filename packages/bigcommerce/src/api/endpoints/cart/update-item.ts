import { normalizeCart } from '../../../lib/normalize'
import { parseCartItem } from '../../utils/parse-item'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CartEndpoint } from '.'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  res,
  body: { cartId, itemId, item },
  config,
}) => {
  const { data } = await config.storeApiFetch<{ data?: any }>(
    `/v3/carts/${cartId}/items/${itemId}?include=line_items.physical_items.options`,
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
  res.status(200).json({ data: normalizeCart(data) })
}

export default updateItem
