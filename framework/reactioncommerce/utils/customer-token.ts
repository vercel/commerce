import Cookies, { CookieAttributes } from 'js-cookie'
import {
  REACTION_COOKIE_EXPIRE,
  REACTION_CUSTOMER_TOKEN_COOKIE,
} from '../const'

export const getCustomerToken = () =>
  Cookies.get(REACTION_CUSTOMER_TOKEN_COOKIE)

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(REACTION_CUSTOMER_TOKEN_COOKIE)
  } else {
    Cookies.set(
      REACTION_CUSTOMER_TOKEN_COOKIE,
      token,
      options ?? {
        expires: REACTION_COOKIE_EXPIRE,
      }
    )
  }
}
