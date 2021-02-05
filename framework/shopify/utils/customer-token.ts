import Cookies from 'js-cookie'
import { SHOPIFY_CUSTOMER_TOKEN_COOKIE } from '@framework/const'

export const getCustomerToken = () => Cookies.get(SHOPIFY_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (token: string | null, options?: any) => {
  if (!token) {
    Cookies.remove(SHOPIFY_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(SHOPIFY_CUSTOMER_TOKEN_COOKIE, token, options)
  }
}
