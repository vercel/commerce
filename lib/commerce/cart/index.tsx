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
  const { fetcherRef, cartCookie } = useCommerce()
  const fetcher = (url?: string, query?: string) =>
    Cookies.get(cartCookie) ? fetcherRef.current({ url, query }) : null
  const { url, query } = useContext(CartContext)
  const response = useSWR([url, query], fetcher, {
    revalidateOnFocus: false,
  })

  return Object.assign(response, { isEmpty: true }) as CartResponse<C>
}

export { CartProvider, useCart }
