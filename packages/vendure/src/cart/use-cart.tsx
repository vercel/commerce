import { SWRHook } from '@vercel/commerce/utils/types'
import useCart, { type UseCart } from '@vercel/commerce/cart/use-cart'
import { ActiveOrderQuery, CartFragment } from '../../schema'
import { normalizeCart } from '../utils/normalize'
import { useMemo } from 'react'
import { getCartQuery } from '../utils/queries/get-cart-query'
import type { GetCartHook } from '@vercel/commerce/types/cart'

export type CartResult = {
  activeOrder?: CartFragment
  addItemToOrder?: CartFragment
  adjustOrderLine?: CartFragment
  removeOrderLine?: CartFragment
}

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    const { activeOrder } = await fetch<ActiveOrderQuery>(options)
    return activeOrder ? normalizeCart(activeOrder) : null
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
