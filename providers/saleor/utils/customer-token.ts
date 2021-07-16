import Cookies, { CookieAttributes } from 'js-cookie'
import * as Const from '../const'

export const getToken = () => Cookies.get(Const.SALEOR_TOKEN)
export const setToken = (token?: string, options?: CookieAttributes) => {
  setCookie(Const.SALEOR_TOKEN, token, options)
}

export const getCSRFToken = () => Cookies.get(Const.SALEOR_CRSF_TOKEN)
export const setCSRFToken = (token?: string, options?: CookieAttributes) => {
  setCookie(Const.SALEOR_CRSF_TOKEN, token, options)
}

export const getCheckoutToken = () => Cookies.get(Const.CHECKOUT_ID_COOKIE)
export const setCheckoutToken = (token?: string, options?: CookieAttributes) => {
  setCookie(Const.CHECKOUT_ID_COOKIE, token, options)
}

const setCookie = (name: string, token?: string, options?: CookieAttributes) => {
  if (!token) {
    Cookies.remove(name)
  } else {
    Cookies.set(name, token, options ?? { expires: 60 * 60 * 24 * 30 })
  }
}
