import {
  REACTION_ANONYMOUS_CART_TOKEN_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from '../../const'

import checkoutCreateMutation from '../../utils/mutations/checkout-create'
import Cookies from 'js-cookie'

export const checkoutCreate = async (fetch: any) => {
  const data = await fetch({
    query: checkoutCreateMutation,
    variables: {
      input: {
        shopId,
      },
    },
  })

  const checkout = data.checkoutCreate?.checkout
  const checkoutId = checkout?.id

  if (checkoutId) {
    const options = {
      expires: SHOPIFY_COOKIE_EXPIRE,
    }
    Cookies.set(REACTION_ANONYMOUS_CART_TOKEN_COOKIE, checkoutId, options)
    Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  }

  return checkout
}

export default checkoutCreate
