import {
  getActiveCart,
  normalizeCart,
  removeCartCookie,
  setCartId,
} from '../../../utils'
import type { CartEndpoint } from '.'
import { Cart, CartUpdate, ClientResponse } from '@commercetools/platform-sdk'

const addItem: CartEndpoint['handlers']['addItem'] = async ({
  req,
  res,
  body: { item },
  config,
}) => {
  const activeCart = await getActiveCart(req, res, config.sdkFetch)
  if (
    (item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)) ||
    !activeCart
  ) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  const lineItem: CartUpdate = {
    version: activeCart.version,
    actions: [
      {
        action: 'addLineItem',
        variantId: +item.variantId,
        productId: item.productId,
        quantity: item.quantity ?? 1,
      },
    ],
  }
  const updatedCart = await config.sdkFetch<ClientResponse<Cart>, CartUpdate>({
    query: 'carts',
    method: 'post',
    variables: {
      id: activeCart.id,
    },
    body: lineItem,
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

export default addItem
