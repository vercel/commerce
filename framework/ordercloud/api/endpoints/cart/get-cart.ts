import type { OrdercloudLineItem } from '../../../types/cart'
import type { CartEndpoint } from '.'

import { serialize } from 'cookie'

import { formatCart } from '../../utils/cart'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res,
  body: { cartId },
  config: { restFetch, cartCookie },
}) => {
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    // Get cart
    const cart = await restFetch('GET', `/orders/Outgoing/${cartId}`)

    // Get line items
    const lineItems = await restFetch(
      'GET',
      `/orders/Outgoing/${cartId}/lineitems`
    ).then((response: { Items: OrdercloudLineItem[] }) => response.Items)

    // Format cart
    const formattedCart = formatCart(cart, lineItems)

    // Return cart and errors
    res.status(200).json({ data: formattedCart, errors: [] })
  } catch (error) {
    // Reset cart cookie
    res.setHeader(
      'Set-Cookie',
      serialize(cartCookie, cartId, {
        maxAge: -1,
        path: '/',
      })
    )

    // Return empty cart
    res.status(200).json({ data: null, errors: [] })
  }
}

export default getCart
