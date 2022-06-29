import Cookies from 'js-cookie'

import { SHOPIFY_CART_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from '../const'

export const setCartUrlCookie = (cartUrl: string) => {
  if (cartUrl) {
    const oldCookie = Cookies.get(SHOPIFY_CART_URL_COOKIE)
    if (oldCookie !== cartUrl) {
      Cookies.set(SHOPIFY_CART_URL_COOKIE, cartUrl, {
        expires: SHOPIFY_COOKIE_EXPIRE,
      })
    }
  }
}
