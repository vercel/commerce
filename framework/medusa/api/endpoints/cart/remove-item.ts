import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import Cookies from 'js-cookie'
import type { CartEndpoint } from '.'

import { normalizeCart } from '../../../utils/normalizers/normalize-cart'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  res,
  body: { itemId },
  config: { restFetch },
}) => {
  const cartId = Cookies.get(MEDUSA_CART_ID_COOKIE)

  if (!cartId || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const response = await restFetch(
    'DELETE',
    `/store/cart/${cartId}/line-items/${itemId}`,
    null
  )

  const normalizedCart = normalizeCart(response.cart)

  // Return cart and errors
  res.status(200).json({ data: normalizedCart, errors: [] })
}

export default removeItem
