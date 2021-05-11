import Cookies, { CookieAttributes } from 'js-cookie'

export const getToken = () => Cookies.get('saleor.Token')
export const setToken = (token?: string, options?: CookieAttributes) => {
  setCookie('saleor.Token', token, options)
}

export const getCSRFToken = () => Cookies.get('saleor.CSRFToken')
export const setCSRFToken = (token?: string, options?: CookieAttributes) => {
  setCookie('saleor.CSRFToken', token, options)
}

const setCookie = (name: string, token?: string, options?: CookieAttributes) => {
  if (!token) {
    Cookies.remove(name)
  } else {
    Cookies.set(name, token, options ?? { expires: 60 * 60 * 24 * 30 })
  }
}
