import { useMemo } from 'react'
import { SWRHook } from '@vercel/commerce/utils/types'
import useWishlist, {
  UseWishlist,
} from '@vercel/commerce/wishlist/use-wishlist'
import useCustomer from '../customer/use-customer'

import type { GetWishlistHook } from '../types/wishlist'

export default useWishlist as UseWishlist<typeof handler>
export const handler: SWRHook<GetWishlistHook> = {
  fetchOptions: {
    url: '/api/wishlist',
    method: 'GET',
  },
  async fetcher({ input: { customerId, includeProducts }, options, fetch }) {
    if (!customerId) return null

    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (includeProducts) url.searchParams.set('products', '1')

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const { data: customer } = useCustomer()
      const response = useData({
        input: [
          ['customerId', customer?.entityId],
          ['includeProducts', input?.includeProducts],
        ],
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.items?.length || 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
