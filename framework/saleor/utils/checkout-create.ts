import Cookies from 'js-cookie'

import checkoutCreateMutation from './mutations/checkout-create'
import { CheckoutCreatePayload } from '../schema'

export const checkoutCreate = async (
  fetch: any
): Promise<CheckoutCreatePayload> => {
  const data = await fetch({
    query: checkoutCreateMutation,
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: 60 * 60 * 24 * 30,
    }
    Cookies.set('saleorCheckoutID', checkoutId, options)
  }

  return checkout
}

export default checkoutCreate
