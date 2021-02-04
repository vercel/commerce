import Cookies from 'js-cookie'
import { SHOPIFY_CHECKOUT_COOKIE } from '..'

const getCheckoutId = (id?: string) => {
  return id ?? Cookies.get(SHOPIFY_CHECKOUT_COOKIE)
}

export default getCheckoutId
