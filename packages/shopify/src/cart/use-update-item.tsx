import type {
  CartLinesUpdateMutation,
  CartLinesUpdateMutationVariables,
} from '../../schema'

import type {
  HookFetcherContext,
  MutationHookContext,
} from '@vercel/commerce/utils/types'

import type { UpdateItemHook, LineItem } from '@vercel/commerce/types/cart'

import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import { ValidationError } from '@vercel/commerce/utils/errors'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'

import useCart from './use-cart'

import { handler as removeItemHandler } from './use-remove-item'

import { getCartId } from '../utils/cart'
import { normalizeCart } from '../utils/normalize'
import { cartLinesUpdateMutation } from '../utils/mutations/cart-mutations'

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler = {
  fetchOptions: {
    query: cartLinesUpdateMutation,
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
    const { cartLinesUpdate } = await fetch<
      CartLinesUpdateMutation,
      CartLinesUpdateMutationVariables
    >({
      ...options,
      variables: {
        cartId: getCartId(),
        lines: [
          {
            id: itemId,
            quantity: item.quantity,
          },
        ],
      },
    })

    return normalizeCart(cartLinesUpdate?.cart)
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
