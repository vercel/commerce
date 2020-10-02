import {
  CartProvider as CommerceCartProvider,
  useCart as useCommerceCart,
} from 'lib/commerce/cart'
import { FunctionComponent } from 'react'

export type Cart = any

interface Props {
  children?: any
}

function useCart() {
  return useCommerceCart<Cart>()
}

const CartProvider: FunctionComponent<Props> = ({ children }) => {
  return <CommerceCartProvider>{children}</CommerceCartProvider>
}

export { CartProvider, useCart }
