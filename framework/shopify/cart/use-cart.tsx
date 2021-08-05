import { useMemo } from 'react'
import useCommerceCart, { UseCart } from '@commerce/cart/use-cart'

import { SWRHook } from '@commerce/utils/types'
import { checkoutCreate, checkoutToCart } from '../utils'
import getCheckoutQuery from '../utils/queries/get-checkout-query'
import { GetCartHook } from '../types/cart'

export default useCommerceCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    if (cartId) {
      const { node } = await fetch({
        ...options,
        variables: {
          checkoutId: cartId,
        },
      })
      return checkoutToCart({
        checkout: node?.completedAt ? await checkoutCreate(fetch) : node,
      })
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
