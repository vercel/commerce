import { useCallback } from 'react'
import type {
  MutationHookContext,
  HookFetcherContext,
} from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import type { Cart, LineItem, RemoveItemHook } from '../types/cart'
import useCart from './use-cart'

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemActionInput<T>) => Promise<Cart | null | undefined>
  : (input: RemoveItemActionInput<T>) => Promise<Cart | null>

export type RemoveItemActionInput<T = any> = T extends LineItem
  ? Partial<RemoveItemHook['actionInput']>
  : RemoveItemHook['actionInput']

export default useRemoveItem as UseRemoveItem<typeof handler>

import { getCartId, normalizeCart, throwUserErrors } from '../utils'
import cartLineItemRemoveMutation from '../utils/mutations/cart-line-item-remove'

import {
  CartLinesRemoveMutation,
  CartLinesRemoveMutationVariables,
} from '../schema'

export const handler = {
  fetchOptions: {
    query: cartLineItemRemoveMutation,
  },
  async fetcher({
    input: { itemId },
    options,
    fetch,
  }: HookFetcherContext<RemoveItemHook>) {
    const data = await fetch<
      CartLinesRemoveMutation,
      CartLinesRemoveMutationVariables
    >({
      ...options,
      variables: { cartId: getCartId(), lineIds: [itemId] },
    })

    throwUserErrors(data.cartLinesRemove?.userErrors)

    return normalizeCart(data.cartLinesRemove?.cart)
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
