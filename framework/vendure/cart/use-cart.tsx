import { Cart } from '@commerce/types'
import { SWRHook } from '@commerce/utils/types'
import useCart, { FetchCartInput, UseCart } from '@commerce/cart/use-cart'
import { ActiveOrderQuery, CartFragment } from '../schema'
import { normalizeCart } from '../lib/normalize'
import { useMemo } from 'react'
import { getCartQuery } from '../lib/queries/get-cart-query'

export type CartResult = {
  activeOrder?: CartFragment
  addItemToOrder?: CartFragment
  adjustOrderLine?: CartFragment
  removeOrderLine?: CartFragment
}

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<
  Cart | null,
  {},
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    query: getCartQuery,
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    const { activeOrder } = await fetch<ActiveOrderQuery>(options)
    return activeOrder ? normalizeCart(activeOrder) : null
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
