import useCart, { UseCart } from '@vercel/commerce/cart/use-cart'
import { SWRHook } from '@vercel/commerce/utils/types'
import { useMemo } from 'react'
import type { GetCartHook } from '@vercel/commerce/types/cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    url: '/api/cart',
    method: 'get',
  },
  async fetcher({ input, options, fetch }) {
    const data = await fetch({
      ...options,
    })
    return data
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
