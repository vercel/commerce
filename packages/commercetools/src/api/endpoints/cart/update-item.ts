import { Cart, CartUpdate, ClientResponse } from '@commercetools/platform-sdk'
import {
  getActiveCart,
  normalizeCart,
  removeCartCookie,
  setCartId,
} from '../../../utils'
import type { CartEndpoint } from '.'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  req,
  res,
  body: { itemId, item },
  config,
}) => {
  const activeCart = await getActiveCart(req, res, config.sdkFetch)
  if (!itemId || !item || !activeCart) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }

  const lineItem: CartUpdate = {
    version: activeCart.version,
    actions: [
      {
        action: 'changeLineItemQuantity',
        lineItemId: activeCart.lineItems.find(
          (lineItem) =>
            lineItem.productId === item.productId &&
            `${lineItem.variant.id}` === item.variantId
        )!.id,
        quantity: item.quantity!,
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

export default updateItem
