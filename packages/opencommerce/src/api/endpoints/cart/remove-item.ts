import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import removeCartItemsMutation from '../../mutations/remove-cart-item'
import type { CartEndpoint } from '.'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  res,
  body: { cartId, itemId },
  config,
  req: { cookies },
}) => {
  if (!cartId || !itemId) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const {
    data: { removeCartItems },
  } = await config.fetch(removeCartItemsMutation, {
    variables: {
      input: {
        cartId,
        cartItemIds: [itemId],
        cartToken: cookies[config.anonymousCartTokenCookie],
      },
    },
  })

  res.setHeader(
    'Set-Cookie',
    getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
  )

  res.status(200).json({ data: normalizeCart(removeCartItems.cart) })
}

export default removeItem
