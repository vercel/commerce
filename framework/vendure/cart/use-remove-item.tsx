import { useCallback } from 'react'
import { HookFetcherContext, MutationHookContext } from '@commerce/utils/types'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import { CommerceError } from '@commerce/utils/errors'
import useCart from './use-cart'
import {
  RemoveOrderLineMutation,
  RemoveOrderLineMutationVariables,
} from '../schema'
import { Cart, LineItem, RemoveCartItemBody } from '@commerce/types'
import { normalizeCart } from '../lib/normalize'
import { removeOrderLineMutation } from '../lib/mutations/remove-order-line-mutation'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler = {
  fetchOptions: {
    query: removeOrderLineMutation,
  },
  async fetcher({ input, options, fetch }: HookFetcherContext<LineItem>) {
    const variables: RemoveOrderLineMutationVariables = {
      orderLineId: input.id,
    }
    const { removeOrderLine } = await fetch<RemoveOrderLineMutation>({
      ...options,
      variables,
    })

    if (removeOrderLine.__typename === 'Order') {
      return normalizeCart(removeOrderLine)
    }
    throw new CommerceError(removeOrderLine)
  },
  useHook: ({
    fetch,
  }: MutationHookContext<Cart | null, RemoveCartItemBody>) => (ctx = {}) => {
    const { mutate } = useCart()

    return useCallback(
      async function removeItem(input) {
        const data = await fetch({ input })
        await mutate(data, false)
        return data
      },
      [fetch, mutate]
    )
  },
}
