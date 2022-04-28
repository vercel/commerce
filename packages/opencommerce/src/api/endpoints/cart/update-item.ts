import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import updateCartItemsQuantityMutation from '../../mutations/update-cart-item-quantity'
import type { CartEndpoint } from '.'
import { UpdateCartItemsQuantityPayload } from '../../../../schema'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  res,
  body: { cartId, itemId, item },
  config,
  req: { cookies },
}) => {
  if (!cartId || !itemId || !item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const {
    data: { updateCartItemsQuantity },
  } = await config.fetch(updateCartItemsQuantityMutation, {
    variables: {
      updateCartItemsQuantityInput: {
        cartId,
        cartToken: cookies[config.anonymousCartTokenCookie],
        items: [{ cartItemId: itemId, quantity: item.quantity }],
      },
    },
  })

  // Update the cart cookie
  res.setHeader(
    'Set-Cookie',
    getCartCookie(config.cartCookie, cartId, config.cartCookieMaxAge)
  )
  res.status(200).json({ data: normalizeCart(updateCartItemsQuantity.cart) })
}

export default updateItem
