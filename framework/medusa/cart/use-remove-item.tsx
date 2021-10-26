import {
  HookFetcherContext,
  MutationHook,
  MutationHookContext,
} from '@commerce/utils/types'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import Cookies from 'js-cookie'
import { normalizeCart } from '@framework/utils/normalizers/normalize-cart'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import { Cart, LineItem, RemoveItemHook } from '@commerce/types/cart'
import { useCallback } from 'react'
import useCart from './use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemActionInput<T>) => Promise<Cart | null | undefined>
  : (input: RemoveItemActionInput<T>) => Promise<Cart | null>

export type RemoveItemActionInput<T = any> = T extends LineItem
  ? Partial<RemoveItemHook['actionInput']>
  : RemoveItemHook['actionInput']

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '/api/cart',
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
