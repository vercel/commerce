import useSWR, { responseInterface } from 'swr'
import Cookies from 'js-cookie'
import { useCommerce } from '..'

const CART_API = '/api/bigcommerce/cart'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

function useCart<C>() {
  const { fetcherRef, cartCookie } = useCommerce()
  const fetcher = (url?: string, query?: string) =>
    Cookies.get(cartCookie) ? fetcherRef.current({ url, query }) : null
  const response = useSWR([CART_API, undefined], fetcher, {
    revalidateOnFocus: false,
  })

  return Object.assign(response, { isEmpty: true }) as CartResponse<C>
}

export { useCart }
