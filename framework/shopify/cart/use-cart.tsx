import { useMemo } from 'react'
import type { ShopifyProvider } from '..'

import useCommerceCart, {
  FetchCartInput,
  UseCart,
} from '@commerce/cart/use-cart'

import { Cart } from '@commerce/types'
import { HookHandler } from '@commerce/utils/types'

import fetcher from './utils/fetcher'
import getCheckoutQuery from '@framework/utils/queries/get-checkout-query'

export default useCommerceCart as UseCart<ShopifyProvider>

export const handler: HookHandler<
  Cart | null,
  {},
  FetchCartInput,
  { isEmpty?: boolean }
> = {
  fetchOptions: {
    query: getCheckoutQuery,
  },
  fetcher,
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
