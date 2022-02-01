import type { CartEndpoint } from '.'

import { formatCart } from '../../utils/cart'
import { OrdercloudLineItem } from '../../../types/cart'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  req,
  res,
  body: { cartId, itemId },
  config: { restBuyerFetch, tokenCookie },
}) => {
  if (!cartId || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Get token from cookies
  const token = req.cookies[tokenCookie]

  // Remove the item to the order
  await restBuyerFetch(
    'DELETE',
    `/orders/Outgoing/${cartId}/lineitems/${itemId}`,
    null,
    { token }
  )

  // Get cart
  const [cart, lineItems] = await Promise.all([
    restBuyerFetch('GET', `/orders/Outgoing/${cartId}`, null, { token }),
    restBuyerFetch('GET', `/orders/Outgoing/${cartId}/lineitems`, null, {
      token,
    }).then((response: { Items: OrdercloudLineItem[] }) => response.Items),
  ])

  // Format cart
  const formattedCart = formatCart(cart, lineItems)

  // Return cart and errors
  res.status(200).json({ data: formattedCart, errors: [] })
}

export default removeItem
