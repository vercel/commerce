import Cookies from 'js-cookie'
import { REACTION_CART_ID_COOKIE } from '../const'

const getCartId = (id?: string) => {
  return id ?? Cookies.get(REACTION_CART_ID_COOKIE)
}

export default getCartId
