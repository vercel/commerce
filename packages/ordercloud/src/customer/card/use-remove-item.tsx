import type {
  MutationHookContext,
  HookFetcherContext,
} from '@vercel/commerce/utils/types'
import type { Card, RemoveItemHook } from '@vercel/commerce/types/customer/card'

import { useCallback } from 'react'

import { ValidationError } from '@vercel/commerce/utils/errors'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/customer/card/use-remove-item'

import useCards from './use-cards'

export type RemoveItemFn<T = any> = T extends Card
  ? (input?: RemoveItemActionInput<T>) => Promise<Card | null | undefined>
  : (input: RemoveItemActionInput<T>) => Promise<Card | null>

export type RemoveItemActionInput<T = any> = T extends Card
  ? Partial<RemoveItemHook['actionInput']>
  : RemoveItemHook['actionInput']

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler = {
  fetchOptions: {
    url: '/api/customer/card',
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
    function useHook<T extends Card | undefined = undefined>(
      ctx: { item?: T } = {}
    ) {
      const { item } = ctx
      const { mutate } = useCards()
      const removeItem: RemoveItemFn<Card> = async (input) => {
        const itemId = input?.id ?? item?.id

        if (!itemId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fetch({ input: { itemId } })

        await mutate([], false)

        return data
      }

      return useCallback(removeItem as RemoveItemFn<T>, [fetch, mutate])
    },
}
