import type { CartEndpoint } from '.'

import { formatCart } from '../../utils/cart'
import { OrdercloudLineItem } from '../../../types/cart'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  res,
  body: { cartId, itemId },
  config: { fetch },
}) => {
  if (!cartId || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  // Remove the item to the order
  await fetch('DELETE', `/orders/Outgoing/${cartId}/lineitems/${itemId}`)

  // Get cart
  const [cart, lineItems] = await Promise.all([
    fetch('GET', `/orders/Outgoing/${cartId}`),
    fetch('GET', `/orders/Outgoing/${cartId}/lineitems`).then(
      (response: { Items: OrdercloudLineItem[] }) => response.Items
    ),
  ])

  // Format cart
  const formattedCart = formatCart(cart, lineItems)

  // Return cart and errors
  res.status(200).json({ data: formattedCart, errors: [] })
}

export default removeItem
