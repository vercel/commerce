import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import Cookies from 'js-cookie'
import type { CartEndpoint } from '.'

import { normalizeCart } from '../../../utils/normalizers/normalize-cart'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  req,
  res,
  body: { itemId, item },
  config: { restFetch },
}) => {
  const cartId = Cookies.get(MEDUSA_CART_ID_COOKIE)

  if (!cartId || !itemId || !item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Add the item to the order
  const response = await restFetch(
    'POST',
    `/store/carts/${cartId}/line-items/${itemId}`,
    {
      quantity: item.quantity,
    }
  )

  // Format cart
  const formattedCart = normalizeCart(response.cart)

  // Return cart and errors
  res.status(200).json({ data: formattedCart, errors: [] })
}

export default updateItem
