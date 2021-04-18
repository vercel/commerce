import { useMemo } from 'react'
import useCommerceCart, {
  FetchCartInput,
  UseCart,
} from '@commerce/cart/use-cart'

import { Cart } from '../types'
import { SWRHook } from '@commerce/utils/types'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<
  Cart | null,
  {},
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    query: ``,
  },
  async fetcher({ input: { cartId: checkoutId }, options, fetch }) {
    return null
  },
  useHook: ({ useData }) => (input) => {
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
