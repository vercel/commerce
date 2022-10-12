import CookieHandler from '../../../api/utils/cookie-handler'
import { normalizeCart } from '../../../lib/normalize'
import { Cart } from '../../../../schema'
import type { CartEndpoint } from '.'
import { getCartQuery } from '../../queries/get-cart-query'

const getCart: CartEndpoint['handlers']['getCart'] = async ({
  req,
  config,
}) => {
  let currentCart: Cart = {}
  let headers
  try {
    const cookieHandler = new CookieHandler(config, req)
    let accessToken = null

    if (!cookieHandler.getAccessToken()) {
      let anonymousShopperTokenResponse =
        await cookieHandler.getAnonymousToken()
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
    headers = cookieHandler.headers
  } catch (error) {
    throw error
  }

  return {
    data: currentCart ? normalizeCart(currentCart) : null,
  }
}

export default getCart
