import { SHOPIFY_CHECKOUT_ID_COOKIE, STORE_DOMAIN } from './const'

import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useSearch } from './product/use-search'
import { handler as useCustomer } from './customer/use-customer'
import fetcher from './fetcher'

export const shopifyProvider = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  fetcher,
  cart: { useCart, useAddItem },
  customer: { useCustomer },
  products: { useSearch },
}

export type ShopifyProvider = typeof shopifyProvider
