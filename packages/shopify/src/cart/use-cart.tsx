import { useMemo } from 'react'
import Cookies from 'js-cookie'
import useCommerceCart, { UseCart } from '@vercel/commerce/cart/use-cart'

import type { SWRHook } from '@vercel/commerce/utils/types'
import type { GetCartHook } from '../types/cart'
import type { GetCartQueryVariables, QueryRoot } from '../../schema'

import { SHOPIFY_CART_ID_COOKIE } from '../const'
import { getCartQuery, normalizeCart, setCartUrlCookie } from '../utils'

export default useCommerceCart as UseCart<typeof handler>
export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    if (cartId) {
      let { cart } = await fetch<QueryRoot, GetCartQueryVariables>({
        ...options,
        variables: { cartId },
      })
      if (cart) {
        setCartUrlCookie(cart.checkoutUrl)
        return normalizeCart(cart)
      } else {
        Cookies.remove(SHOPIFY_CART_ID_COOKIE)
      }
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        swrOptions: { revalidateOnFocus: false, ...input?.swrOptions },
      })
      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.lineItems?.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
