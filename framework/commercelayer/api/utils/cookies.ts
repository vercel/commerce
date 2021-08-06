import Cookies, { CookieAttributes } from 'js-cookie'

const setCookie = (
  name: string,
  token?: string,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove(name)
  } else {
    Cookies.set(name, token, options)
  }
}

export default setCookie
