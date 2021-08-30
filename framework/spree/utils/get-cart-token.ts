import { requireConfigValue } from '../isomorphic-config'
import Cookies from 'js-cookie'

const getCartToken = () =>
  Cookies.get(requireConfigValue('cartCookieName') as string)

export default getCartToken
