import { Provider } from '@commerce'

import { default as fetcher } from './fetcher'

import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { handler as useRemoveItem } from './cart/use-remove-item'

import { handler as useCustomer } from './customer/use-customer'

import { handler as useSearch } from './product/use-search'

import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useSignup } from './auth/use-signup'

import { MEDUSA_CART_ID_COOKIE } from './const'

export const medusaProvider: Provider = {
  locale: 'en-us',
  cartCookie: MEDUSA_CART_ID_COOKIE,
  fetcher,
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  customer: { useCustomer },
  products: { useSearch },
  auth: { useLogin, useLogout, useSignup },
}

export type MedusaProvider = typeof medusaProvider
