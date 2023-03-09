import { useCallback } from 'react'
import {
  HookFetcherContext,
  MutationHook,
  MutationHookContext,
} from '@vercel/commerce/utils/types'
import useRemoveItem, {
  UseRemoveItem,
} from '@vercel/commerce/cart/use-remove-item'
import type {
  LineItem,
  RemoveItemHook,
  Cart,
} from '@vercel/commerce/types/cart'
import { ValidationError } from '@vercel/commerce/utils/errors'
import useCart from './use-cart'

export type RemoveItemActionInput<T = any> = T extends LineItem
  ? Partial<RemoveItemHook['actionInput']>
  : RemoveItemHook['actionInput']

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemActionInput<T>) => Promise<Cart | null | undefined>
  : (input: RemoveItemActionInput<T>) => Promise<Cart | null>

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    url: '/api/commerce/cart',
    method: 'DELETE',
  },
  async fetcher({ input: { itemId }, options, fetch }) {
    return await fetch({ ...options, body: { itemId } })
  },
  useHook:
    ({ fetch }: MutationHookContext<RemoveItemHook>) =>
    <T extends LineItem | undefined = undefined>(ctx: { item?: T } = {}) => {
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
