import { FC } from 'react'
import {
  CartProvider as CommerceCartProvider,
  useCart as useCommerceCart,
} from 'lib/commerce/cart'

export type Cart = any

export const CartProvider: FC = ({ children }) => {
  return <CommerceCartProvider query="">{children}</CommerceCartProvider>
}

export function useCart() {
  return useCommerceCart<Cart>()
}
