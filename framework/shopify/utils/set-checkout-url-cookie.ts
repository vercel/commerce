import Cookies from 'js-cookie'

import { SHOPIFY_CART_URL_COOKIE, SHOPIFY_COOKIE_EXPIRE } from '../const'

export const setCheckoutUrlCookie = (checkoutUrl: string) => {
  if (checkoutUrl) {
    const oldCookie = Cookies.get(SHOPIFY_CART_URL_COOKIE)
    if (oldCookie !== checkoutUrl) {
      Cookies.set(SHOPIFY_CART_URL_COOKIE, checkoutUrl, {
        expires: SHOPIFY_COOKIE_EXPIRE,
      })
    }
  }
}

export default setCheckoutUrlCookie
