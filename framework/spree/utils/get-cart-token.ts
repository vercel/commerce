import { requireConfigValue } from '@framework/isomorphic-config'
import Cookies from 'js-cookie'

const getCartToken = () =>
  Cookies.get(requireConfigValue('cartCookieName') as string)

export default getCartToken
