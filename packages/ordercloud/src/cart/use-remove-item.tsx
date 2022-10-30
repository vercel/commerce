import type {
  MutationHookContext,
  HookFetcherContext,
} from '@vercel/commerce/utils/types'
import type {
  Cart,
  LineItem,
  RemoveItemHook,
} from '@vercel/commerce/types/cart'

import { useCallback } from 'react'

import { ValidationError } from '@vercel/commerce/utils/errors'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'

import useCart from './use-cart'

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemActionInput<T>) => Promise<Cart | null | undefined>
  : (input: RemoveItemActionInput<T>) => Promise<Cart | null>

export type RemoveItemActionInput<T = any> = T extends LineItem
  ? Partial<RemoveItemHook['actionInput']>
  : RemoveItemHook['actionInput']

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler = {
  fetchOptions: {
    url: '/api/commerce/cart',
    method: 'DELETE',
  },
  async fetcher({
    input: { itemId },
    options,
    fetch,
  }: HookFetcherContext<RemoveItemHook>) {
    return await fetch({ ...options, body: { itemId } })
  },
  useHook: ({ fetch }: MutationHookContext<RemoveItemHook>) =>
    function useHook<T extends LineItem | undefined = undefined>(
      ctx: { item?: T } = {}
    ) {
      const { item } = ctx
      const { mutate } = useCart()
      const removeItem: RemoveItemFn<LineItem> = async (input) => {
        const itemId = input?.id ?? item?.id

        if (!itemId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fetch({ input: { itemId } })

        await mutate(data, false)

        return data
      }

      return useCallback(removeItem as RemoveItemFn<T>, [fetch, mutate])
    },
}
