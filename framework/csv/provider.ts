import useCart from './cart/use-cart'
import useAddItem from './cart/use-add-item'
import useUpdateItem from './cart/use-update-item'
import useRemoveItem from './cart/use-remove-item'

import { handler as useCustomer } from './customer/use-customer'
import { handler as useSearch } from './product/use-search'

import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useSignup } from './auth/use-signup'

export const csvProvider = {
  locale: 'en-us',
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  customer: { useCustomer },
  products: { useSearch },
  auth: { useLogin, useLogout, useSignup },
}

export type CSVProvider = typeof csvProvider
