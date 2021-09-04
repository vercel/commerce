import { WOOCOMMERCE_CHECKOUT_ID_COOKIE } from './const'

import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { handler as useRemoveItem } from './cart/use-remove-item'

import fetcher from './fetcher'

export const wooCommerceProvider = {
  locale: 'en-us',
  fetcher,
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  cartCookie: WOOCOMMERCE_CHECKOUT_ID_COOKIE,
}

export type WooCommerceProvider = typeof wooCommerceProvider
