import { useMemo } from 'react'
import useCommerceCart, { UseCart } from '@vercel/commerce/cart/use-cart'

import { SWRHook } from '@vercel/commerce/utils/types'
import { checkoutCreate, checkoutToCart, getCheckoutId } from '../utils'
import * as query from '../utils/queries'
import { GetCartHook } from '@vercel/commerce/types/cart'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: query.CheckoutOne,
  },
  async fetcher({ input: { cartId: checkoutId }, options, fetch }) {
    let checkout

    if (checkoutId) {
      const checkoutId = getCheckoutId().checkoutToken
      const data = await fetch({
        ...options,
        variables: { checkoutId },
      })

      checkout = data
    }

    if (checkout?.completedAt || !checkoutId) {
      checkout = await checkoutCreate(fetch)
    }

    return checkoutToCart(checkout)
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
