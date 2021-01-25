import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import useCartRemoveItem from '@commerce/cart/use-remove-item'
import useCart, { Cart } from './use-cart'
import { cartFragment } from '@framework/api/fragments/cart'

export const removeOrderLineMutation = /* GraphQL */ `
  mutation removeOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      ...Cart
    }
  }
  ${cartFragment}
`

export const fetcher: HookFetcher<Cart | null, any> = (
  options,
  { lineId },
  fetch
) => {
  return fetch({
    ...options,
    query: removeOrderLineMutation,
    variables: { orderLineId: lineId },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = (item?: any) => {
    const { mutate } = useCart()
    const fn = useCartRemoveItem<Cart | null, any>(
      {},
      customFetcher
    )

    return useCallback(
      async function removeItem(input: any) {
        const data = await fn({ lineId: input.id })
        await mutate(data, false)
        return data
      },
      [fn, mutate]
    )
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
