import { requireConfigValue } from '../../isomorphic-config'
import Cookies from 'js-cookie'

export const getCartToken = () =>
  Cookies.get(requireConfigValue('cartCookieName') as string)

export const setCartToken = (cartToken: string) => {
  const cookieOptions = {
    expires: requireConfigValue('cartCookieExpire') as number,
  }

  Cookies.set(
    requireConfigValue('cartCookieName') as string,
    cartToken,
    cookieOptions
  )
}

export const removeCartToken = () => {
  Cookies.remove(requireConfigValue('cartCookieName') as string)
}
