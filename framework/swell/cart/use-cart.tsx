import useCart, { UseCart } from '@commerce/cart/use-cart'
import { SWRHook } from '@commerce/utils/types'
import { useMemo } from 'react'
import { normalizeCart } from '../utils/normalize'
import { checkoutCreate, checkoutToCart } from './utils'
import type { GetCartHook } from '@commerce/types/cart'

export default useCart as UseCart<typeof handler>

export const handler: SWRHook<GetCartHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'get',
  },
  async fetcher({ fetch }) {
    const cart = await checkoutCreate(fetch)

    return cart ? normalizeCart(cart) : null
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
