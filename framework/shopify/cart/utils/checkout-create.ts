import { SHOPIFY_CHECKOUT_COOKIE } from '@framework'
import checkoutCreateMutation from '@framework/utils/mutations/checkout-create'
import Cookies from 'js-cookie'

export const createCheckout = async (fetch: any) => {
  const data = await fetch({
    query: checkoutCreateMutation,
  })

  const checkout = data?.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    Cookies.set(SHOPIFY_CHECKOUT_COOKIE, checkoutId)
  }

  return checkout
}

export default createCheckout
