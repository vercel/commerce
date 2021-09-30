import type { OrdercloudLineItem } from '../../../types/cart'
import type { CartEndpoint } from '.'

import { serialize } from 'cookie'

import { formatCart } from '../../utils/cart'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req,
  res,
  body: { cartId },
  config: { restBuyerFetch, cartCookie, tokenCookie },
}) => {
  if (!cartId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    // Get token from cookies
    const token = req.cookies[tokenCookie]

    // Get cart
    const cart = await restBuyerFetch(
      'GET',
      `/orders/Outgoing/${cartId}`,
      null,
      { token }
    )

    // Get line items
    const lineItems = await restBuyerFetch(
      'GET',
      `/orders/Outgoing/${cartId}/lineitems`,
      null,
      { token }
    ).then((response: { Items: OrdercloudLineItem[] }) => response.Items)

    // Format cart
    const formattedCart = formatCart(cart, lineItems)

    // Return cart and errors
    res.status(200).json({ data: formattedCart, errors: [] })
  } catch (error) {
    // Reset cart and token cookie
    res.setHeader('Set-Cookie', [
      serialize(cartCookie, cartId, {
        maxAge: -1,
        path: '/',
      }),
      serialize(tokenCookie, cartId, {
        maxAge: -1,
        path: '/',
      }),
    ])

    // Return empty cart
    res.status(200).json({ data: null, errors: [] })
  }
}

export default getCart
