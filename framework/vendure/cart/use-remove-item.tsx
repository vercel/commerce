import { useCallback } from 'react'
import { HookFetcher } from '@commerce/utils/types'
import useCartRemoveItem from '@commerce/cart/use-remove-item'
import useCart from './use-cart'
import { cartFragment } from '@framework/api/fragments/cart'
import {
  ErrorResult,
  RemoveOrderLineMutation,
  RemoveOrderLineMutationVariables,
} from '@framework/schema'
import { CommerceError } from '@commerce/utils/errors'

export const removeOrderLineMutation = /* GraphQL */ `
  mutation removeOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
      __typename
      ...Cart
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${cartFragment}
`

export const fetcher: HookFetcher<
  RemoveOrderLineMutation,
  RemoveOrderLineMutationVariables
> = (options, { orderLineId }, fetch) => {
  return fetch({
    ...options,
    query: removeOrderLineMutation,
    variables: { orderLineId },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useRemoveItem = (item?: any) => {
    const { mutate } = useCart()
    const fn = useCartRemoveItem<
      RemoveOrderLineMutation,
      RemoveOrderLineMutationVariables
    >({}, customFetcher)

    return useCallback(
      async function removeItem(input: any) {
        const { removeOrderLine } = await fn({ orderLineId: input.id })
        if (removeOrderLine.__typename === 'Order') {
          await mutate({ removeOrderLine }, false)
        } else {
          throw new CommerceError({
            message: (removeOrderLine as ErrorResult).message,
          })
        }
        return { removeOrderLine }
      },
      [fn, mutate]
    )
  }

  useRemoveItem.extend = extendHook

  return useRemoveItem
}

export default extendHook(fetcher)
