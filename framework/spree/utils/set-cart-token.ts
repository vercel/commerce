import { requireConfigValue } from '../isomorphic-config'
import Cookies from 'js-cookie'

const setCartToken = (cartToken: string) => {
  const cookieOptions = {
    expires: requireConfigValue('cartCookieExpire') as number,
  }

  Cookies.set(
    requireConfigValue('cartCookieName') as string,
    cartToken,
    cookieOptions
  )
}

export default setCartToken
