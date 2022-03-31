/* eslint-disable react-hooks/rules-of-hooks */
import useWishlist, {
  UseWishlist,
} from '@vercel/commerce/wishlist/use-wishlist'
import type { GetWishlistHook } from '../types/wishlist'
import { SWRHook } from '@vercel/commerce/utils/types'

import { useMemo } from 'react'

export default useWishlist as UseWishlist<typeof handler>

export const handler: SWRHook<GetWishlistHook> = {
  fetchOptions: {
    url: '/api/wishlist',
    method: 'GET',
  },
  async fetcher({ options, fetch }) {
    const data = await fetch({ ...options })

    return data
  },

  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
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
