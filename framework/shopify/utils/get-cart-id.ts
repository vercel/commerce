import Cookies from 'js-cookie'
import { SHOPIFY_CART_ID_COOKIE } from '../const'

const getCartId = (id?: string) => {
  return id || Cookies.get(SHOPIFY_CART_ID_COOKIE)
}

export default getCartId
