import { useMemo } from 'react'
import useCommerceCart, { UseCart } from '@commerce/cart/use-cart'

import { SWRHook } from '@commerce/utils/types'
import { GetCartHook } from '../types/cart'
import { GetCartQueryVariables, QueryRoot } from '../schema'
import { normalizeCart, getCartQuery, setCheckoutUrlCookie } from '../utils'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    if (cartId) {
      const { cart } = await fetch<QueryRoot, GetCartQueryVariables>({
        ...options,
        variables: { cartId },
      })
      setCheckoutUrlCookie(cart?.checkoutUrl)
      return normalizeCart(cart)
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
