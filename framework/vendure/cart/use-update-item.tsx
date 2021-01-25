import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type { HookFetcher } from '@commerce/utils/types'
import useCartUpdateItem from '@commerce/cart/use-update-item'
import useCart from './use-cart'
import { cartFragment } from '@framework/api/fragments/cart'
import {
  AdjustOrderLineMutation,
  AdjustOrderLineMutationVariables,
} from '@framework/schema'

export const adjustOrderLineMutation = /* GraphQL */ `
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
      ...Cart
    }
  }
  ${cartFragment}
`
export const fetcher: HookFetcher<
  AdjustOrderLineMutation,
  AdjustOrderLineMutationVariables
> = (options, { orderLineId, quantity }, fetch) => {
  return fetch({
    ...options,
    query: adjustOrderLineMutation,
    variables: { orderLineId, quantity },
  })
}

function extendHook(customFetcher: typeof fetcher, cfg?: { wait?: number }) {
  const useUpdateItem = (item?: any) => {
    const { mutate } = useCart()
    const fn = useCartUpdateItem<
      AdjustOrderLineMutation,
      AdjustOrderLineMutationVariables
    >({}, customFetcher)

    return useCallback(
      debounce(async (input: any) => {
        const { adjustOrderLine } = await fn({
          orderLineId: item.id,
          quantity: input.quantity,
        })
        if (adjustOrderLine.__typename === 'Order') {
          await mutate({ adjustOrderLine }, false)
        }
        return { adjustOrderLine }
      }, cfg?.wait ?? 500),
      [fn, mutate]
    )
  }

  useUpdateItem.extend = extendHook

  return useUpdateItem
}

export default extendHook(fetcher)
