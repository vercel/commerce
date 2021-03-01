import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from '../../const'

import checkoutCreateMutation from '../../utils/mutations/checkout-create'
import Cookies from 'js-cookie'

export const checkoutCreate = async (fetch: any) => {
  const data = await fetch({
    query: checkoutCreateMutation,
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout
}

export default checkoutCreate
