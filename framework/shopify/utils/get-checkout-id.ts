import Cookies from 'js-cookie'
import { SHOPIFY_CHECKOUT_COOKIE } from '..'

const getCheckoutId = (id?: string) => {
  const checkoutID = id ?? Cookies.get(SHOPIFY_CHECKOUT_COOKIE)
  console.log(checkoutID)
  return checkoutID
}

export default getCheckoutId
