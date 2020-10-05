import { createContext, useContext, FC, useCallback, useMemo } from 'react'
import useSWR, { responseInterface } from 'swr'
import Cookies from 'js-cookie'
import { useCommerce } from '..'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

export type CartProviderProps =
  | { query: string; url?: string }
  | { query?: string; url: string }

const CartContext = createContext<CartResponse<any> | null>(null)

const CartProvider: FC<CartProviderProps> = ({ children, query, url }) => {
  const { fetcher: fetch, cartCookie } = useCommerce()
  const fetcher = (url?: string, query?: string) => fetch({ url, query })
  const cartId = Cookies.get(cartCookie)
  const response = useSWR(() => (cartId ? [url, query] : null), fetcher, {
    revalidateOnFocus: false,
  })

  return (
    // Avoid destructuring the `response` obj from SWR so we don't trigger the getters
    // early, also the result of useSWR is memoized and it's better to keep it that way
    // so we don't re-render every consumer
    <CartContext.Provider value={Object.assign(response, { isEmpty: true })}>
      {children}
    </CartContext.Provider>
  )
}

function useCart<C>() {
  return useContext(CartContext) as CartResponse<C>
}

export { CartProvider, useCart }
