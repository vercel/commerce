import { useMemo } from 'react'
import useCommerceCart, { UseCart } from '@vercel/commerce/cart/use-cart'

import { SWRHook } from '@vercel/commerce/utils/types'
import { getCartQuery, normalizeCart } from '../utils'
import { GetCartHook } from '../types/cart'
import Cookies from 'js-cookie'

import { GetCartQueryVariables, QueryRoot } from '../../schema'

import { SHOPIFY_CART_ID_COOKIE } from '../const'
import { setCartUrlCookie } from '../utils/set-cart-url-cookie'

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
