import { useCallback } from 'react'
import type {
  MutationHookContext,
  HookFetcherContext,
} from '@commerce/utils/types'
import { RemoveCartItemBody } from '@commerce/types'
import { ValidationError } from '@commerce/utils/errors'
import useRemoveItem, {
  RemoveItemInput as RemoveItemInputBase,
  UseRemoveItem,
} from '@commerce/cart/use-remove-item'
import useCart from './use-cart'
import {
  checkoutLineItemRemoveMutation,
  getCheckoutId,
  checkoutToCart,
} from '../utils'
import { Cart, LineItem } from '../types'
import { Mutation, MutationCheckoutLineItemsRemoveArgs } from '../schema'

export type RemoveItemFn<T = any> = T extends LineItem
  ? (input?: RemoveItemInput<T>) => Promise<Cart | null>
  : (input: RemoveItemInput<T>) => Promise<Cart | null>

export type RemoveItemInput<T = any> = T extends LineItem
  ? Partial<RemoveItemInputBase>
  : RemoveItemInputBase

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler = {
  fetchOptions: {
    query: checkoutLineItemRemoveMutation,
  },
  async fetcher({
    input: { itemId },
    options,
    fetch,
  }: HookFetcherContext<RemoveCartItemBody>) {
    const data = await fetch<Mutation, MutationCheckoutLineItemsRemoveArgs>({
      ...options,
      variables: { checkoutId: getCheckoutId(), lineItemIds: [itemId] },
    })
    return checkoutToCart(data.checkoutLineItemsRemove)
  },
  useHook: ({
    fetch,
  }: MutationHookContext<Cart | null, RemoveCartItemBody>) => <
    T extends LineItem | undefined = undefined
  >(
    ctx: { item?: T } = {}
  ) => {
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
