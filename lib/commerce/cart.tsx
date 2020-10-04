import { createContext, useContext, FC } from 'react'
import useSWR, { responseInterface } from 'swr'
import { useCommerce } from '.'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

export type CartProviderProps =
  | { query: string; url?: string }
  | { query?: string; url: string }

const CartContext = createContext<CartResponse<any> | null>(null)

function getCartCookie() {
  // TODO: Figure how the cart should be persisted
  return null
}

const CartProvider: FC<CartProviderProps> = ({ children, query, url }) => {
  const { fetcher } = useCommerce()
  const cartId = getCartCookie()
  const response = useSWR(() => (cartId ? [url, query] : null), fetcher)

  return (
    <CartContext.Provider value={{ ...response, isEmpty: true }}>
      {children}
    </CartContext.Provider>
  )
}

function useCart<C>() {
  return useContext(CartContext) as CartResponse<C>
}

export { CartProvider, useCart }
