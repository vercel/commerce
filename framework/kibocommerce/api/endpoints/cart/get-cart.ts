import getAnonymousShopperToken from '@framework/api/utils/get-anonymous-shopper-token'
import { normalizeCart } from '@framework/lib/normalize'
import { Cart } from '@framework/schema'
import type { CartEndpoint } from '.'
import { getCartQuery } from '../../queries/getCartQuery'

const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req,
  res,
  body: { cartId },
  config,
}) => {
  let currentCart: Cart = {}
  try {
    const token = req.cookies[config.customerCookie]
    let accessToken = token ? JSON.parse(token).accessToken : null

    if (!accessToken) {
      const response: any = await getAnonymousShopperToken({config})
      accessToken = response?.accessToken
    }

    let result = await config.fetch(
      getCartQuery,
      {},
      { headers: { 'x-vol-user-claims': accessToken } }
    )
    currentCart = result?.data?.currentCart
  } catch (error) {
    throw error
  }
  res.status(200).json({
    data: currentCart ? normalizeCart(currentCart) : null,
  })
}

export default getCart
