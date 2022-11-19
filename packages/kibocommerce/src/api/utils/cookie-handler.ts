import { KiboCommerceConfig } from './../index'
import { getCookieExpirationDate } from '../../lib/get-cookie-expiration-date'
import { prepareSetCookie } from '../../lib/prepare-set-cookie'

import getAnonymousShopperToken from './get-anonymous-shopper-token'
import type { NextRequest } from 'next/server'

const parseCookie = (cookieValue?: any) => {
  return cookieValue
    ? JSON.parse(Buffer.from(cookieValue, 'base64').toString('ascii'))
    : null
}
export default class CookieHandler {
  config: KiboCommerceConfig
  request: NextRequest
  headers: HeadersInit | undefined
  accessToken: any
  constructor(config: any, req: NextRequest) {
    this.config = config
    this.request = req

    const encodedToken = req.cookies.get(config.customerCookie)
    const token = parseCookie(encodedToken)
    this.accessToken = token ? token.accessToken : null
  }

  async getAnonymousToken() {
    const response: any = await getAnonymousShopperToken({
      config: this.config,
    })
    let anonymousAccessToken = response?.accessToken
    return {
      response,
      accessToken: anonymousAccessToken,
    }
  }
  isShopperCookieAnonymous() {
    const customerCookieKey = this.config.customerCookie
    const shopperCookie = this.request.cookies.get(customerCookieKey)
    const shopperSession = parseCookie(shopperCookie)
    const isAnonymous = shopperSession?.customerAccount ? false : true
    return isAnonymous
  }
  setAnonymousShopperCookie(anonymousShopperTokenResponse: any) {
    const cookieExpirationDate = getCookieExpirationDate(
      this.config.customerCookieMaxAgeInDays
    )

    const authCookie = prepareSetCookie(
      this.config.customerCookie,
      JSON.stringify(anonymousShopperTokenResponse),
      anonymousShopperTokenResponse?.accessTokenExpiration
        ? { expires: cookieExpirationDate }
        : {}
    )
    this.headers = {
      'Set-Cookie': authCookie,
    }
  }
  getAccessToken() {
    return this.accessToken
  }
}
