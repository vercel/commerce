import { normalizeCart } from '../../../utils/normalize'
import getCartCookie from '../../utils/get-cart-cookie'
import updateCartItemsQuantityMutation from '../../mutations/update-cart-item-quantity'
import type { CartEndpoint } from '.'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  body: { cartId, itemId, item },
  config,
  req: { cookies },
}) => {
  if (!cartId || !itemId || !item) {
    return {
      data: undefined,
      errors: [{ message: 'Invalid request' }],
    }
  }

  const {
    data: { updateCartItemsQuantity },
  } = await config.fetch(updateCartItemsQuantityMutation, {
    variables: {
      updateCartItemsQuantityInput: {
        cartId,
        cartToken: cookies.get(config.anonymousCartTokenCookie)?.value,
        items: [{ cartItemId: itemId, quantity: item.quantity }],
      },
    },
  })

  // Update the cart cookie

  return {
    data: normalizeCart(updateCartItemsQuantity.cart),
    headers: {
      'Set-Cookie': getCartCookie(
        config.cartCookie,
        cartId,
        config.cartCookieMaxAge
      ),
    },
  }
}

export default updateItem
