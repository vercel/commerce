import type { CartEndpoint } from '.'
import type { BigcommerceCart } from '../../../types'

import { normalizeCart } from '../../../lib/normalize'
import { parseCartItem } from '../../utils/parse-item'
import getCartCookie from '../../utils/get-cart-cookie'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  body: { cartId, item },
  config,
}) => {
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
    ? await config.storeApiFetch<{ data: BigcommerceCart }>(
        `/v3/carts/${cartId}/items?include=line_items.physical_items.options,line_items.digital_items.options`,
        options
      )
    : await config.storeApiFetch<{ data: BigcommerceCart }>(
        '/v3/carts?include=line_items.physical_items.options,line_items.digital_items.options',
        options
      )

  return {
    data: normalizeCart(data),
    headers: {
      'Set-Cookie': getCartCookie(
        config.cartCookie,
        data.id,
        config.cartCookieMaxAge
      ),
    },
  }
}

export default addItem
