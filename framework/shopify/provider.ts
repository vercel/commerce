import { SHOPIFY_CHECKOUT_ID_COOKIE, STORE_DOMAIN } from './const'

import { handler as useCart } from '@framework/cart/use-cart'
import { handler as useSearch } from '@framework/product/use-search'
import { handler as useCustomer } from '@framework/customer/use-customer'
import fetcher from './fetcher'

export const shopifyProvider = {
  locale: 'en-us',
  cartCookie: SHOPIFY_CHECKOUT_ID_COOKIE,
  storeDomain: STORE_DOMAIN,
  fetcher,
  cart: { useCart },
  customer: { useCustomer },
  products: { useSearch },
}

export type ShopifyProvider = typeof shopifyProvider
