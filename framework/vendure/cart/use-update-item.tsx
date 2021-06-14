import { useCallback } from 'react'
import {
  HookFetcherContext,
  MutationHook,
  MutationHookContext,
} from '@commerce/utils/types'
import { CommerceError, ValidationError } from '@commerce/utils/errors'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import { CartItemBody, LineItem } from '@commerce/types/cart'
import useCart from './use-cart'
import {
  AdjustOrderLineMutation,
  AdjustOrderLineMutationVariables,
} from '../schema'
import { normalizeCart } from '../utils/normalize'
import { adjustOrderLineMutation } from '../utils/mutations/adjust-order-line-mutation'
import { UpdateItemHook } from '../types/cart'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler = {
  fetchOptions: {
    query: adjustOrderLineMutation,
  },
  async fetcher(context: HookFetcherContext<UpdateItemHook>) {
    const { input, options, fetch } = context
    const variables: AdjustOrderLineMutationVariables = {
      quantity: input.item.quantity || 1,
      orderLineId: input.itemId,
    }
    const { adjustOrderLine } = await fetch<AdjustOrderLineMutation>({
      ...options,
      variables,
    })

    if (adjustOrderLine.__typename === 'Order') {
      return normalizeCart(adjustOrderLine)
    }
    throw new CommerceError(adjustOrderLine)
  },
  useHook:
    ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    (
      ctx: {
        item?: LineItem
        wait?: number
      } = {}
    ) => {
      const { item } = ctx
      const { mutate } = useCart()

      return useCallback(
        async function addItem(input: UpdateItemActionInput) {
          const itemId = item?.id
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
        },
        [fetch, mutate]
      )
    },
}
