import CookieHandler from '@framework/api/utils/cookie-handler'
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
    const cookieHandler = new CookieHandler(config, req, res)
    let accessToken = null

    if (!cookieHandler.getAccessToken()) {
      let anonymousShopperTokenResponse = await cookieHandler.getAnonymousToken()
      const response = anonymousShopperTokenResponse.response
      accessToken = anonymousShopperTokenResponse.accessToken
      cookieHandler.setAnonymousShopperCookie(response)
    } else {
      accessToken = cookieHandler.getAccessToken()
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
