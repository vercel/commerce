import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import removeCartItemsMutation from '../../mutations/remove-cart-item'
import type { CartEndpoint } from '.'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  body: { cartId, itemId },
  config,
  req: { cookies },
}) => {
  if (!cartId || !itemId) {
    return {
      data: null,
      errors: [{ message: 'Invalid request' }],
    }
  }

  const {
    data: { removeCartItems },
  } = await config.fetch(removeCartItemsMutation, {
    variables: {
      input: {
        cartId,
        cartItemIds: [itemId],
        cartToken: cookies.get(config.anonymousCartTokenCookie)?.value,
      },
    },
  })

  return {
    data: normalizeCart(removeCartItems.cart),
    headers: {
      'Set-Cookie': getCartCookie(
        config.cartCookie,
        cartId,
        config.cartCookieMaxAge
      ),
    },
  }
}

export default removeItem
