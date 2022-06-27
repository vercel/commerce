import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type {
  HookFetcherContext,
  MutationHookContext,
} from '@vercel/commerce/utils/types'
import { ValidationError } from '@vercel/commerce/utils/errors'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'
import useCart from './use-cart'
import { LineItem } from '@vercel/commerce/types/cart'
import { UpdateItemHook } from '../types/cart'

export default useUpdateItem as UseUpdateItem<typeof handler>

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export const handler = {
  fetchOptions: {
    url: '/api/cart',
    method: 'put',
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) {
    if (Number.isInteger(item.quantity)) {
      // Also allow the update hook to remove an item if the quantity is lower than 1
      if (item.quantity! < 1) {
        item.quantity = 0
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
  useHook:
    ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    <T extends LineItem | undefined = undefined>(
      ctx: {
        item?: T
        wait?: number
      } = {}
    ) => {
      const { item } = ctx
      const { mutate, data: cartData } = useCart() as any

      return useCallback(
        debounce(async (input: UpdateItemActionInput) => {
          const firstLineItem = cartData.lineItems[0]
          const itemId = item?.id || firstLineItem.id
          const productId = item?.productId || firstLineItem.productId
          const variantId = item?.variant.id || firstLineItem.variant.id
          if (!itemId || !productId) {
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
