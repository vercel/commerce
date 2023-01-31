import { SHOPIFY_CART_URL_COOKIE } from '../../../const'
import type { CheckoutEndpoint } from '.'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
}) => {
  const { cookies } = req
  const cartUrl = cookies.get(SHOPIFY_CART_URL_COOKIE)?.value

  return {
    redirectTo: cartUrl || '/cart',
  }
}

export default getCheckout
