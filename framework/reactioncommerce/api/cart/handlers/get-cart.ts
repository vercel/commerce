import type { Cart } from '../../../types'
import type { CartHandlers } from '../'
import getAnomymousCartQuery from '@framework/utils/queries/get-anonymous-cart'
import getCartCookie from '@framework/api/utils/get-cart-cookie'
import {
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  REACTION_CART_ID_COOKIE,
} from '@framework/const.ts'
import { normalizeCart } from '@framework/utils'

// Return current cart info
const getCart: CartHandlers['getCart'] = async ({
  req: {
    cookies: {
      [REACTION_ANONYMOUS_CART_TOKEN_COOKIE]: anonymousCartToken,
      [REACTION_CART_ID_COOKIE]: cartId,
    },
  },
  res,
  config,
}) => {
  let normalizedCart

  console.log('get-cart API')
  console.log('anonymousCartToken', anonymousCartToken)
  console.log('cartId', cartId)
  console.log('shopId', config.shopId)

  if (cartId && anonymousCartToken) {
    const {
      data: { cart: rawCart },
    } = await config.fetch(getAnomymousCartQuery, {
      variables: {
        cartId,
        cartToken: anonymousCartToken,
      },
    })

    normalizedCart = normalizeCart(rawCart)
  } else {
    res.setHeader(
      'Set-Cookie',
      getCartCookie(config.cartCookie, config.dummyEmptyCartId, 999)
    )
  }

  res.status(200).json({ data: normalizedCart ?? null })
}

export default getCart
