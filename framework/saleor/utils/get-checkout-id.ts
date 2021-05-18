import Cookies from 'js-cookie'
import { CHECKOUT_ID_COOKIE } from '../const'

const getCheckoutId = (id?: string) => {
  const r = Cookies.get(CHECKOUT_ID_COOKIE)?.split(':') || []
  return { checkoutId: r[0], checkoutToken: r[1] }
}

export default getCheckoutId
