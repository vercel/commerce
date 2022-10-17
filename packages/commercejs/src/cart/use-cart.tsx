import { useMemo } from 'react'
import type { GetCartHook } from '@vercel/commerce/types/cart'
import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'
import type { CommercejsCart } from '../types'
import { normalizeCart } from '../utils/normalize-cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'retrieve',
  },
  async fetcher({ options, fetch }) {
    const cart = await fetch<CommercejsCart>({
      query: options.query,
      method: options.method,
    })
    return normalizeCart(cart)
  },
  useHook: ({ useData }) =>
    function useHook(input) {
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
