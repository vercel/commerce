import { useMemo } from 'react'
import useCommerceCart, { UseCart } from '@vercel/commerce/cart/use-cart'

import { SWRHook } from '@vercel/commerce/utils/types'
import { getCartQuery, normalizeCart } from '../utils'
import { GetCartHook } from '../types/cart'
import Cookies from 'js-cookie'

import { SHOPIFY_CART_ID_COOKIE, SHOPIFY_CART_URL_COOKIE } from '../const'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    if (cartId) {
      const { node: cart } = await fetch({
        ...options,
        variables: {
          checkoutId: cartId,
        },
      })
      if (cart?.completedAt) {
        Cookies.remove(SHOPIFY_CART_ID_COOKIE)
        Cookies.remove(SHOPIFY_CART_URL_COOKIE)
        return null
      } else {
        return normalizeCart(cart)
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
                return (response.data?.lineItems.length ?? 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
