import { serialize } from 'cookie'
import type { Cart } from '@vnda/headless-framework'

import type { CartEndpoint, Handler } from '.'

import {
  mapCommerceToRawRequest,
  mapRawToCommerceResponse,
} from '../../../utils/cart'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  res: response,
  body: { cartId, item },
  config: { service, cartCookie, cartTokenCookie },
}: Handler) => {
  try {
    if (!item) {
      return response.status(400).json({
        data: null,
        errors: [{ message: 'Missing item' }],
      })
    }

    if (!item.quantity) item.quantity = 1

    let cart: Cart

    if (!cartId) {
      cart = await service.cart.create()

      response.setHeader('Set-Cookie', [
        serialize(cartCookie, cart.id.toString(), {
          maxAge: 60 * 60 * 24 * 30,
          expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }),
        serialize(cartTokenCookie, cart.token, {
          maxAge: 60 * 60 * 24 * 30,
          expires: new Date(Date.now() + 60 * 60 * 24 * 30 * 1000),
          secure: process.env.NODE_ENV === 'production',
          path: '/',
          sameSite: 'lax',
        }),
      ])
    } else {
      cart = await service.cart.getById(Number(cartId))
    }

    const itemExistQuantity =
      (
        cart.items.find(({ variantSku }) => variantSku === item.variantId)! ||
        []
      ).quantity || 0

    const cartItem = await service.cart.addItem(
      cartId ? Number(cartId) : cart!.id,
      mapCommerceToRawRequest({
        ...item,
        quantity: Number(itemExistQuantity) + 1 || 1,
      })
    )

    cart.items = [
      ...(cart?.items.map((value) =>
        value.variantSku === item.variantId ? cartItem : value
      ) || []),
      ...(itemExistQuantity ? [] : [cartItem]),
    ]

    response.status(200).json({
      data: mapRawToCommerceResponse(cart),
      errors: [],
    })
  } catch (error) {
    response.status(500).json({
      data: {},
      errors: error,
    })
  }
}

export default addItem
