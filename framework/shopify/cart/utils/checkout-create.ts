import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
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
    Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl)
  }

  return checkout
}

export default checkoutCreate
