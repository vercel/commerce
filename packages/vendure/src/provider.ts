import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { handler as useRemoveItem } from './cart/use-remove-item'
import { handler as useCustomer } from './customer/use-customer'
import { handler as useSearch } from './product/use-search'
import { handler as useLogin } from './auth/use-login'
import { handler as useLogout } from './auth/use-logout'
import { handler as useSignup } from './auth/use-signup'
import { handler as useCheckout } from './checkout/use-checkout'
import { handler as useSubmitCheckout } from './checkout/use-submit-checkout'
import { handler as useCards } from './customer/card/use-cards'
import { handler as useAddCardItem } from './customer/card/use-add-item'
import { handler as useAddresses } from './customer/address/use-addresses'
import { handler as useAddAddressItem } from './customer/address/use-add-item'
import { fetcher } from './fetcher'

export const vendureProvider = {
  locale: 'en-us',
  cartCookie: 'session',
  fetcher,
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  customer: {
    useCustomer,
    card: {
      useCards,
      useAddItem: useAddCardItem,
    },
    address: {
      useAddresses,
      useAddItem: useAddAddressItem,
    },
  },
  products: { useSearch },
  checkout: {
    useCheckout,
    useSubmitCheckout,
  },
  auth: { useLogin, useLogout, useSignup },
}

export type VendureProvider = typeof vendureProvider
