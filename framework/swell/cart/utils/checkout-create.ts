import {
  SHOPIFY_CHECKOUT_ID_COOKIE,
  SHOPIFY_CHECKOUT_URL_COOKIE,
  SHOPIFY_COOKIE_EXPIRE,
} from '../../const'

// import checkoutCreateMutation from '../../utils/mutations/checkout-create'
import Cookies from 'js-cookie'

export const checkoutCreate = async (fetch: any) => {
  const cart = await fetch({
    query: 'cart',
    method: 'get',
  })

  // const checkout = data.checkoutCreate?.checkout
  const checkoutId = cart?.id

  // if (checkoutId) {
  //   const options = {
  //     expires: SHOPIFY_COOKIE_EXPIRE,
  //   }
  //   Cookies.set(SHOPIFY_CHECKOUT_ID_COOKIE, checkoutId, options)
  //   Cookies.set(SHOPIFY_CHECKOUT_URL_COOKIE, checkout?.webUrl, options)
  // }

  return cart
}

export default checkoutCreate
