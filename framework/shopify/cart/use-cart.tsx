import { useMemo } from 'react'
import useCommerceCart, {
  FetchCartInput,
  UseCart,
} from '@commerce/cart/use-cart'

import { Cart } from '../types'
import { SWRHook } from '@commerce/utils/types'
import { checkoutCreate, checkoutToCart } from '../utils'
import getCheckoutQuery from '../utils/queries/get-checkout-query'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<
  Cart | null,
  {},
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ input: { cartId: checkoutId }, options, fetch }) {
    let checkout

    if (checkoutId) {
      const data = await fetch({
        ...options,
        variables: {
          checkoutId: checkoutId,
        },
      })
      checkout = data.node
    }

    if (checkout?.completedAt || !checkoutId) {
      checkout = await checkoutCreate(fetch)
    }

    return checkoutToCart({ checkout })
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
