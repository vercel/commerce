import { FC, createContext, useContext, useMemo } from 'react'
import useSWR, { responseInterface } from 'swr'
import Cookies from 'js-cookie'
import { useCommerce } from '..'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

export type CartProviderProps =
  | { query: string; url?: string }
  | { query?: string; url: string }

const CartContext = createContext<{ query?: string; url?: string }>({})

const CartProvider: FC<CartProviderProps> = ({ children, query, url }) => {
  const value = useMemo(() => ({ query, url }), [query, url])
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

function useCart<C>() {
  const { fetcher: fetch, cartCookie } = useCommerce()
  const fetcher = (url?: string, query?: string) => fetch({ url, query })
  const cartId = Cookies.get(cartCookie)
  const { url, query } = useContext(CartContext)
  const response = useSWR(() => (cartId ? [url, query] : null), fetcher, {
    revalidateOnFocus: false,
  })

  return Object.assign(response, { isEmpty: true }) as CartResponse<C>
}

export { CartProvider, useCart }
