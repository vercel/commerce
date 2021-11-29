import type { CartEndpoint } from '.'

import { serialize } from 'cookie'
import { normalizeCart } from '../../../utils/normalizers/normalize-cart'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req,
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
    const response = await restFetch('GET', `/store/carts/${cartId}`)

    // Format cart
    const normalizedCart = normalizeCart(response.cart)

    // Return cart and errors
    res.status(200).json({ data: normalizedCart, errors: [] })
  } catch (error) {
    // Reset cart
    res.setHeader('Set-Cookie', [
      serialize(cartCookie, cartId, {
        maxAge: -1,
        path: '/',
      }),
    ])

    // Return empty cart
    res.status(200).json({ data: null, errors: [] })
  }
}

export default getCart
