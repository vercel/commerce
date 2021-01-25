import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type { HookFetcher } from '@commerce/utils/types'
import useCartUpdateItem from '@commerce/cart/use-update-item'
import useCart, { Cart } from './use-cart'
import { cartFragment } from '@framework/api/fragments/cart'

export const adjustOrderLineMutation = /* GraphQL */ `
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ...Cart
    }
  }
  ${cartFragment}
`
export const fetcher: HookFetcher<Cart | null, any> = (
  options,
  { lineId, quantity },
  fetch
) => {
  return fetch({
    ...options,
    query: adjustOrderLineMutation,
    variables: { orderLineId: lineId, quantity },
  })
}

function extendHook(customFetcher: typeof fetcher, cfg?: { wait?: number }) {
  const useUpdateItem = (item?: any) => {
    const { mutate } = useCart()
    const fn = useCartUpdateItem<Cart | null, any>(
      {},
      customFetcher
    )

    return useCallback(
      debounce(async (input: any) => {
        const data = await fn({
          lineId: item.id,
          quantity: input.quantity,
        })
        await mutate(data, false)
        return data
      }, cfg?.wait ?? 500),
      [fn, mutate]
    )
  }

  useUpdateItem.extend = extendHook

  return useUpdateItem
}

export default extendHook(fetcher)
