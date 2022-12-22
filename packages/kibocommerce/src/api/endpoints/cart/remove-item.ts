import { normalizeCart } from '../../../lib/normalize'
import type { CartEndpoint } from '.'
import removeItemFromCartMutation from '../../../api/mutations/removeItemFromCart-mutation'
import { getCartQuery } from '../../../api/queries/get-cart-query'

const removeItem: CartEndpoint['handlers']['removeItem'] = async ({
  req,
  body: { itemId },
  config,
}) => {
  const encodedToken = req.cookies.get(config.customerCookie)?.value

  const token = encodedToken
    ? Buffer.from(encodedToken, 'base64').toString('ascii')
    : null

  const accessToken = token ? JSON.parse(token).accessToken : null

  const removeItemResponse = await config.fetch(
    removeItemFromCartMutation,
    {
      variables: { id: itemId },
    },
    { headers: { 'x-vol-user-claims': accessToken } }
  )

  let currentCart = null
  if (removeItemResponse.data.deleteCurrentCartItem) {
    let result = await config.fetch(
      getCartQuery,
      {},
      { headers: { 'x-vol-user-claims': accessToken } }
    )
    currentCart = result?.data?.currentCart
  }

  return {
    data: normalizeCart(currentCart),
  }
}

export default removeItem
