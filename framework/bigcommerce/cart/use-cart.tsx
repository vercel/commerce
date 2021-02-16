import { useMemo } from 'react'
import { HookHandler } from '@commerce/utils/types'
import useCart, { UseCart, FetchCartInput } from '@commerce/cart/use-cart'
import { normalizeCart } from '../lib/normalize'
import type { Cart } from '../types'
import type { BigcommerceProvider } from '..'

export default useCart as UseCart<BigcommerceProvider>

export const handler: HookHandler<
  Cart | null,
  {},
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'GET',
  },
  async fetcher({ input: { cartId }, options, fetch }) {
    const data = cartId ? await fetch(options) : null
    return data && normalizeCart(data)
  },
  useHook({ input, useData }) {
    const response = useData({
      swrOptions: { revalidateOnFocus: false, ...input.swrOptions },
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
