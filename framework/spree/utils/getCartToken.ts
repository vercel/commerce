import { requireConfigValue } from '@framework/isomorphicConfig'
import Cookies from 'js-cookie'

const getCartToken = () =>
  Cookies.get(requireConfigValue('cartCookieName') as string)

export default getCartToken
