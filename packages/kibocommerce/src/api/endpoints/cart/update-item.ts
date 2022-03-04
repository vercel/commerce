import { normalizeCart } from '../../../lib/normalize'
import type { CartEndpoint } from '.'
import { getCartQuery } from '../../../api/queries/get-cart-query'
import updateCartItemQuantityMutation from '../../../api/mutations/updateCartItemQuantity-mutation'

const updateItem: CartEndpoint['handlers']['updateItem'] = async ({
  req,
  res,
  body: { cartId, itemId, item },
  config,
}) => {
  if (!itemId || !item) {
    return res.status(400).json({
      data: null,
      errors: [{ message: 'Invalid request' }],
    })
  }
  const encodedToken = req.cookies[config.customerCookie]
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
  res.status(200).json({ data: normalizeCart(currentCart) })
}

export default updateItem
