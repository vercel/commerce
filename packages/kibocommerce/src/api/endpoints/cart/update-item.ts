import { normalizeCart } from '../../../lib/normalize'
import type { CartEndpoint } from '.'
import { getCartQuery } from '../../../api/queries/get-cart-query'
import updateCartItemQuantityMutation from '../../../api/mutations/updateCartItemQuantity-mutation'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  req,
  body: { itemId, item },
  config,
}) => {
  const encodedToken = req.cookies.get(config.cartCookie)
  const token = encodedToken
    ? Buffer.from(encodedToken, 'base64').toString('ascii')
    : null

  const accessToken = token ? JSON.parse(token).accessToken : null

  const updateItemResponse = await config.fetch(
    updateCartItemQuantityMutation,
    {
      variables: { itemId: itemId, quantity: item.quantity },
    },
    { headers: { 'x-vol-user-claims': accessToken } }
  )

  let currentCart = null
  if (updateItemResponse.data) {
    let result = await config.fetch(
      getCartQuery,
      {},
      { headers: { 'x-vol-user-claims': accessToken } }
    )
    currentCart = result?.data?.currentCart
  }

  return { data: normalizeCart(currentCart) }
}

export default updateItem
