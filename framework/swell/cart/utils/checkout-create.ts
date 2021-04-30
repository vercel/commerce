import { SWELL_CHECKOUT_URL_COOKIE } from '../../const'

import Cookies from 'js-cookie'

export const checkoutCreate = async (fetch: any) => {
  const cart = await fetch({
    query: 'cart',
    method: 'get',
  })

  if (!cart) {
    const cart = await fetch({
      query: 'cart',
      method: 'setItems',
      variables: [[]],
    })
  }

  const checkoutUrl = cart?.checkout_url

  if (checkoutUrl) {
    Cookies.set(SWELL_CHECKOUT_URL_COOKIE, checkoutUrl)
  }

  return cart
}

export default checkoutCreate
