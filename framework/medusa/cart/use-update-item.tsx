import {
  HookFetcherContext,
  MutationHook,
  MutationHookContext,
} from '@commerce/utils/types'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import { handler as removeItem } from './use-remove-item'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import Cookies from 'js-cookie'
import { MEDUSA_CART_ID_COOKIE } from '@framework/const'
import { normalizeCart } from '@framework/utils/normalizers/normalize-cart'
import { LineItem, UpdateItemHook } from '@commerce/types/cart'
import { useCallback } from 'react'
import { debounce } from 'lodash'
import useCart from '@commerce/cart/use-cart'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '/api/cart',
    method: 'PUT',
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) {
    if (Number.isInteger(item.quantity)) {
      if (item.quantity! < 1) {
        return removeItem.fetcher!({
          options: removeItem.fetchOptions,
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

      return useCallback(
        debounce(async (input: UpdateItemActionInput<T>) => {
          const itemId = input.id ?? item?.id
          const variantId = input.productId ?? item?.variantId

          if (!itemId) {
            throw new ValidationError({
              message: 'Invalid input used for this operation',
            })
          }

          const data = await fetch({
            input: {
              itemId,
              item: {
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
