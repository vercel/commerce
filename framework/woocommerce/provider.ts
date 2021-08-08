import { WOOCOMMERCE_CHECKOUT_ID_COOKIE } from './const'

import fetcher from './fetcher'

export const wooCommerceProvider = {
  locale: 'en-us',
  fetcher,
  cartCookie: WOOCOMMERCE_CHECKOUT_ID_COOKIE,
}

export type WooCommerceProvider = typeof wooCommerceProvider
