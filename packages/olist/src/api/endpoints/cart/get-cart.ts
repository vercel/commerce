import { serialize } from 'cookie'

import type { CartEndpoint, Handler } from '.'

import { mapRawToCommerceResponse } from '../../../utils/cart'

const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res: response,
  body: { cartId },
  config: { service, cartCookie, cartTokenCookie },
}: Handler) => {
  if (!cartId) {
    return response.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  try {
    const cart = await service.cart.getById(Number(cartId))

    response
      .status(200)
      .json({ data: mapRawToCommerceResponse(cart), errors: [] })
  } catch (error) {
    response.setHeader('Set-Cookie', [
      serialize(cartCookie, cartId, {
        maxAge: -1,
        path: '/',
      }),
      serialize(cartTokenCookie, cartId, {
        maxAge: -1,
        path: '/',
      }),
    ])

    response.status(200).json({ data: null, errors: [] })
  }
}

export default getCart
