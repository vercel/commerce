import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useWishlist, { UseWishlist } from '@commerce/wishlist/use-wishlist'
import useCustomer from '../customer/use-customer'

export type UseWishlistInput = { includeProducts?: boolean }

export default useWishlist as UseWishlist<typeof handler>

export const handler: SWRHook<
  any | null,
  UseWishlistInput,
  { customerId?: number } & UseWishlistInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/wishlist',
    method: 'GET',
  },
  fetcher() {
    return { items: [] }
  },
  useHook: ({ useData }) => (input) => {
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
