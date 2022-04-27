import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import getAnonymousCart from '../../queries/get-anonymous-cart'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res,
  req: { cookies },
  body: { cartId },
  config,
}) => {
  if (cartId && cookies[config.anonymousCartTokenCookie]) {
    const { data } = await config.fetch(getAnonymousCart, {
      variables: {
        cartId,
        cartToken: cookies[config.anonymousCartTokenCookie],
      },
    })

    return res.status(200).json({
      data: normalizeCart(data),
    })
  }

  res.status(200).json({
    data: null,
  })
}

export default getCart
