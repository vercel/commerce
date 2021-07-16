import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type { HookFetcherContext, MutationHookContext } from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'

import useCart from './use-cart'
import { handler as removeItemHandler } from './use-remove-item'
import type { LineItem } from '../types'
import { checkoutToCart } from '../utils'
import { getCheckoutId } from '../utils'
import { Mutation, MutationCheckoutLinesUpdateArgs } from '../schema'

import * as mutation from '../utils/mutations'

import type { UpdateItemHook } from '../types/cart'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler = {
  fetchOptions: { query: mutation.CheckoutLineUpdate },
  async fetcher({ 
    input: { itemId, item }, 
    options, 
    fetch 
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

    const checkoutId = getCheckoutId().checkoutId
    const { checkoutLinesUpdate } = await fetch<Mutation, MutationCheckoutLinesUpdateArgs>({
      ...options,
      variables: {
        checkoutId,
        lineItems: [
          {
            variantId: item.variantId,
            quantity: item.quantity,
          },
        ],
      },
    })

    return checkoutToCart(checkoutLinesUpdate)
  },
  useHook: ({ fetch }: MutationHookContext<UpdateItemHook>) => 
    <T extends LineItem | undefined = undefined>(
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
