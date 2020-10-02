import { createContext, useContext, FunctionComponent } from 'react'
import useSWR, { responseInterface } from 'swr'
import { useCommerce } from '.'
interface Props {
  children?: any
}

export type Cart = any

export type CartResponse<C extends Cart> = responseInterface<C, Error> & {
  isEmpty: boolean
}

const CartContext = createContext<CartResponse<Cart> | any>(null)

function getCartCookie() {
  // TODO: Figure how the cart should be persisted
  return null
}

const CartProvider: FunctionComponent<Props> = ({ children }) => {
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

function useCart<C extends Cart>() {
  return useContext(CartContext) as CartResponse<C>
}

export { CartProvider, useCart }
