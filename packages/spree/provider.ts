import fetcher from './fetcher'
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
import { handler as useWishlist } from './wishlist/use-wishlist'
import { handler as useWishlistAddItem } from './wishlist/use-add-item'
import { handler as useWishlistRemoveItem } from './wishlist/use-remove-item'
import { requireConfigValue } from './isomorphic-config'

const spreeProvider = {
  locale: requireConfigValue('defaultLocale') as string,
  cartCookie: requireConfigValue('cartCookieName') as string,
  fetcher,
  cart: { useCart, useAddItem, useUpdateItem, useRemoveItem },
  customer: { useCustomer },
  products: { useSearch },
  auth: { useLogin, useLogout, useSignup },
  checkout: { useCheckout },
  wishlist: {
    useWishlist,
    useAddItem: useWishlistAddItem,
    useRemoveItem: useWishlistRemoveItem,
  },
}

export { spreeProvider }

export type SpreeProvider = typeof spreeProvider
