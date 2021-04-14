import Cookies, { CookieAttributes } from 'js-cookie'

export const getCustomerToken = () => Cookies.get('saleorAccessToken')

export const setCustomerToken = (
  token: string | null,
  options?: CookieAttributes
) => {
  if (!token) {
    Cookies.remove('saleorAccessToken')
  } else {
    Cookies.set(
      'saleorAccessToken',
      token,
      options ?? {
        expires: 60 * 60 * 24 * 30,
      }
    )
  }
}
