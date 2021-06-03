import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type {
  HookFetcherContext,
  MutationHookContext,
} from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'

import useCart from './use-cart'
import { handler as removeItemHandler } from './use-remove-item'
import type { UpdateItemHook, LineItem } from '../types/cart'
import {
  getCheckoutId,
  checkoutLineItemUpdateMutation,
  checkoutToCart,
} from '../utils'
import { Mutation, MutationCheckoutLineItemsUpdateArgs } from '../schema'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler = {
  fetchOptions: {
    query: checkoutLineItemUpdateMutation,
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) {
    if (Number.isInteger(item.quantity)) {
      // Also allow the update hook to remove an item if the quantity is lower than 1
      if (item.quantity! < 1) {
        return removeItemHandler.fetcher({
          options: removeItemHandler.fetchOptions,
          input: { itemId },
          fetch,
        })
      }
    } else if (item.quantity) {
      throw new ValidationError({
        message: 'The item quantity has to be a valid integer',
      })
    }
    const { checkoutLineItemsUpdate } = await fetch<
      Mutation,
      MutationCheckoutLineItemsUpdateArgs
    >({
      ...options,
      variables: {
        checkoutId: getCheckoutId(),
        lineItems: [
          {
            id: itemId,
            quantity: item.quantity,
          },
        ],
      },
    })

    return checkoutToCart(checkoutLineItemsUpdate)
  },
  useHook: ({ fetch }: MutationHookContext<UpdateItemHook>) => <
    T extends LineItem | undefined = undefined
  >(
    ctx: {
      item?: T
      wait?: number
    } = {}
  ) => {
    const { item } = ctx
    const { mutate } = useCart() as any

    return useCallback(
      debounce(async (input: UpdateItemActionInput<T>) => {
        const itemId = input.id ?? item?.id
        const productId = input.productId ?? item?.productId
        const variantId = input.productId ?? item?.variantId
        if (!itemId || !productId || !variantId) {
          throw new ValidationError({
            message: 'Invalid input used for this operation',
          })
        }

        const data = await fetch({
          input: {
            item: {
              productId,
              variantId,
              quantity: input.quantity,
            },
            itemId,
          },
        })
        await mutate(data, false)
        return data
      }, ctx.wait ?? 500),
      [fetch, mutate]
    )
  },
}
