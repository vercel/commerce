import type { CartEndpoint } from '.'
import { COMMERCETOOLS_CART_COOKIE } from '../../../const'
import {
  getActiveCart,
  normalizeCart,
  removeCartCookie,
  setCartId,
} from '../../../utils'
import { Cart, CartUpdate, ClientResponse } from '@commercetools/platform-sdk'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  res,
  req,
  body: { itemId },
  config,
}) => {
  const cartId = req.cookies[COMMERCETOOLS_CART_COOKIE]
  const activeCart = await getActiveCart(req, res, config.sdkFetch)
  if (!cartId || !itemId || !activeCart) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  const updatedCart = await config.sdkFetch<ClientResponse<Cart>, CartUpdate>({
    query: 'carts',
    method: 'post',
    variables: {
      id: activeCart.id,
    },
    body: {
      version: activeCart.version,
      actions: [
        {
          action: 'changeLineItemQuantity',
          lineItemId: itemId,
          quantity: 0,
        },
      ],
    },
  })

  if (updatedCart.body) {
    setCartId(res, updatedCart.body.id)
  } else {
    removeCartCookie(res)
  }

  const data = updatedCart.body
    ? normalizeCart(updatedCart.body, config)
    : undefined
  res.status(200).json({ data })
}

export default removeItem
