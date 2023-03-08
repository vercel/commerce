import type { CartEndpoint } from '.'

import { serialize } from 'cookie'
import { formatCart } from '../../utils/cart'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req,
  body: { cartId },
  config: { restBuyerFetch, cartCookie, tokenCookie },
}) => {
  // If no cartId is provided, return data null
  if (!cartId) {
    return { data: null }
  }

  try {
    // Get token
    const token = req.cookies.get(tokenCookie)?.value

    // Get cart & line items
    const [cart, { Items }] = await Promise.all([
      restBuyerFetch('GET', `/orders/Outgoing/${cartId}`, null, { token }),
      restBuyerFetch('GET', `/orders/Outgoing/${cartId}/lineitems`, null, {
        token,
      }),
    ])

    // Format cart
    const formattedCart = formatCart(cart, Items)
    // Return cart and errors
    return {
      data: formattedCart,
    }
  } catch (error) {
    console.error(error)
    const headers = {
      'set-cookie': [
        serialize(cartCookie, '', {
          maxAge: -1,
          path: '/',
        }),
        serialize(tokenCookie, '', {
          maxAge: -1,
          path: '/',
        }),
      ],
    }
    // Return empty cart
    return {
      data: null,
      headers,
    }
  }
}

export default getCart
