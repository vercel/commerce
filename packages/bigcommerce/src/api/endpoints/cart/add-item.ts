// @ts-nocheck
import { normalizeCart } from '../../../lib/normalize'
import { parseCartItem } from '../../utils/parse-item'
import getCartCookie from '../../utils/get-cart-cookie'
import type { CartEndpoint } from '.'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res,
  body: { cartId, item },
  config,
}) => {
  if (!item.quantity) item.quantity = 1

  const options = {
    method: 'POST',
    body: JSON.stringify({
      line_items: [parseCartItem(item)],
      ...(!cartId && config.storeChannelId
        ? { channel_id: config.storeChannelId }
        : {}),
    }),
  }
  const { data } = cartId
    ? await config.storeApiFetch(
        `/v3/carts/${cartId}/items?include=line_items.physical_items.options,line_items.digital_items.options`,
        options
      )
    : await config.storeApiFetch(
        '/v3/carts?include=line_items.physical_items.options,line_items.digital_items.options',
        options
      )

  // Create or update the cart cookie
  res.setHeader(
    'Set-Cookie',
    getCartCookie(config.cartCookie, data.id, config.cartCookieMaxAge)
  )
  res.status(200).json({ data: data ? normalizeCart(data) : null })
}

export default addItem
