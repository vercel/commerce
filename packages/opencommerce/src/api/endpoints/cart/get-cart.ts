import { normalizeCart } from '../../../utils/normalize'
import getAnonymousCartQuery from '../../queries/get-anonymous-cart'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  res,
  req: { cookies },
  body: { cartId },
  config,
}) => {
  if (cartId && cookies[config.anonymousCartTokenCookie]) {
    const {
      data: { cart: rawAnonymousCart },
    } = await config.fetch(getAnonymousCartQuery, {
      variables: {
        cartId,
        cartToken: cookies[config.anonymousCartTokenCookie],
      },
    })

    return res.status(200).json({
      data: normalizeCart(rawAnonymousCart),
    })
  }

  res.status(200).json({
    data: null,
  })
}

export default getCart
