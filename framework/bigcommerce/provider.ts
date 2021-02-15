import { handler as useCart } from './cart/use-cart'
import { handler as useWishlist } from './wishlist/use-wishlist'
import { handler as useCustomer } from './customer/use-customer'
import { handler as useSearch } from './product/use-search'
import fetcher from './fetcher'

export const bigcommerceProvider = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
  fetcher,
  cart: { useCart },
  wishlist: { useWishlist },
  customer: { useCustomer },
  products: { useSearch },
}

export type BigcommerceProvider = typeof bigcommerceProvider
