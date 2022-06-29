import { SHOPIFY_CART_URL_COOKIE } from '../../../const'
import type { CheckoutEndpoint } from '.'

const getCheckout: CheckoutEndpoint['handlers']['getCheckout'] = async ({
  req,
  res,
}) => {
  const { cookies } = req
  const cartUrl = cookies[SHOPIFY_CART_URL_COOKIE]

  if (cartUrl) {
    res.redirect(cartUrl)
  } else {
    res.redirect('/cart')
  }
}

export default getCheckout
