import { normalizeCart } from '../../../utils/normalize'
import getAnonymousCartQuery from '../../queries/get-anonymous-cart'
import type { CartEndpoint } from '.'

// Return current cart info
const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req: { cookies },
  body: { cartId },
  config,
}) => {
  if (cartId && cookies.get(config.anonymousCartTokenCookie)?.value) {
    const {
      data: { cart: rawAnonymousCart },
    } = await config.fetch(getAnonymousCartQuery, {
      variables: {
        cartId,
        cartToken: cookies.get(config.anonymousCartTokenCookie)?.value,
      },
    })

    return {
      data: rawAnonymousCart ? normalizeCart(rawAnonymousCart) : null,
    }
  }

  return {
    data: null,
  }
}

export default getCart
