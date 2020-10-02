import { createContext, useContext } from 'react'
import useSWR, { responseInterface } from 'swr'
import { useCommerce } from '.'

export type Cart = any

export type CartResponse<C extends Cart> = responseInterface<C, Error> & {
  isEmpty: boolean
}

const CartContext = createContext<CartResponse<Cart>>(null)

function getCartCookie() {
  // TODO: Figure how the cart should be persisted
  return null
}

export function CartProvider({ children }) {
  const { hooks, fetcher } = useCommerce<Cart>()
  const { useCart } = hooks
  const cartId = getCartCookie()
  const response = useSWR(
    () => (cartId ? [useCart.url, useCart.query, useCart.resolver] : null),
    fetcher
  )
  const isEmpty = true

  return (
    <CartContext.Provider value={{ ...response, isEmpty }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart<C extends Cart>() {
  return useContext(CartContext) as CartResponse<C>
}
