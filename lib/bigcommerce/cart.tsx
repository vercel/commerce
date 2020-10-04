import { FC } from 'react'
import {
  CartProvider as CommerceCartProvider,
  useCart as useCommerceCart,
} from 'lib/commerce/cart'

export type Cart = any

export const CartProvider: FC = ({ children }) => {
  return <CommerceCartProvider url="/api/cart">{children}</CommerceCartProvider>
}

export function useCart() {
  const cart = useCommerceCart<Cart>()

  // TODO: Do something to make this prop work
  cart.isEmpty = true

  return cart
}
