import { handler as useCart } from './cart/use-cart'
import { handler as useAddItem } from './cart/use-add-item'
import { handler as useUpdateItem } from './cart/use-update-item'
import { handler as useWishlist } from './wishlist/use-wishlist'
import { handler as useCustomer } from './customer/use-customer'
import { handler as useSearch } from './product/use-search'
import fetcher from './fetcher'

export const bigcommerceProvider = {
  locale: 'en-us',
  cartCookie: 'bc_cartId',
  fetcher,
  cart: { useCart, useAddItem, useUpdateItem },
  wishlist: { useWishlist },
  customer: { useCustomer },
  products: { useSearch },
}

export type BigcommerceProvider = typeof bigcommerceProvider
