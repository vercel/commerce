import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import { MutationHook } from '@vercel/commerce/utils/types'
import { ValidationError } from '@vercel/commerce/utils/errors'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'

import type { UpdateItemHook, LineItem } from '@vercel/commerce/types/cart'
import type {
  HookFetcherContext,
  MutationHookContext,
} from '@vercel/commerce/utils/types'

import useCart from './use-cart'
import { handler as removeItemHandler } from './use-remove-item'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/cart',
    method: 'PUT',
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) {
    if (Number.isInteger(item.quantity)) {
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

    return await fetch({
      ...options,
      body: { itemId, item },
    })
  },
  useHook: ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    function useHook<T extends LineItem | undefined = undefined>(
      ctx: {
        item?: T
        wait?: number
      } = {}
    ) {
      const { item } = ctx
      const { mutate } = useCart() as any

      // eslint-disable-next-line react-hooks/exhaustive-deps
      return useCallback(
        debounce(async (input: UpdateItemActionInput<T>) => {
          const itemId = input.id ?? item?.id
          const productId = input.productId ?? item?.productId
          const variantId = input.productId ?? item?.variantId

          if (!itemId || !productId) {
            throw new ValidationError({
              message: 'Invalid input used for this operation',
            })
          }

          const data = await fetch({
            input: {
              itemId,
              item: {
                productId,
                variantId: variantId || '',
                quantity: input.quantity,
              },
            },
          })

          await mutate(data, false)

          return data
        }, ctx.wait ?? 500),
        [fetch, mutate]
      )
    },
}
