import Cookies from 'js-cookie'
import { REACTION_ANONYMOUS_CART_TOKEN_COOKIE } from '../const'

const getAnonymousCartToken = (id?: string) => {
  return id ?? Cookies.get(REACTION_ANONYMOUS_CART_TOKEN_COOKIE)
}

export default getAnonymousCartToken
