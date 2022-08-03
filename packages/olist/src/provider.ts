import { handler as useCart } from './cart/use-cart'
import { handler as useAddCartItem } from './cart/use-add-item'
import { handler as useUpdateCartItem } from './cart/use-update-item'
import { handler as useRemoveCartItem } from './cart/use-remove-item'

import { handler as useCustomer } from './customer/use-customer'
import { handler as useSearch } from './product/use-search'

import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useSignup } from './auth/use-signup'

import { handler as useCheckout } from './checkout/use-checkout'
import { handler as useSubmitCheckout } from './checkout/use-submit-checkout'

import { handler as useAddCardItem } from './customer/card/use-add-item'

import { handler as useAddAddressItem } from './customer/address/use-add-item'

import { CART_COOKIE, CART_TOKEN_COOKIE, LOCALE } from './constants'
import { default as fetcher } from './fetcher'

export const olistProvider = {
  locale: LOCALE,
  cartCookie: CART_COOKIE,
  cartTokenCookie: CART_TOKEN_COOKIE,
  fetcher,
  cart: {
    useCart,
    useAddItem: useAddCartItem,
    useUpdateItem: useUpdateCartItem,
    useRemoveItem: useRemoveCartItem,
  },
  checkout: {
    useCheckout,
    useSubmitCheckout,
  },
  customer: {
    useCustomer,
    card: {
      useAddItem: useAddCardItem,
    },
    address: {
      useAddItem: useAddAddressItem,
    },
  },
  products: { useSearch },
  auth: { useLogin, useLogout, useSignup },
}

export type OlistProvider = typeof olistProvider
