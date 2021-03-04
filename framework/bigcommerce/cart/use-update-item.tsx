import { useCallback } from 'react'
import debounce from 'lodash.debounce'
import type {
  MutationHookContext,
  HookFetcherContext,
} from '@commerce/utils/types'
import { ValidationError } from '@commerce/utils/errors'
import useUpdateItem, {
  UpdateItemInput as UpdateItemInputBase,
  UseUpdateItem,
} from '@commerce/cart/use-update-item'
import { normalizeCart } from '../lib/normalize'
import type {
  UpdateCartItemBody,
  Cart,
  BigcommerceCart,
  LineItem,
} from '../types'
import { handler as removeItemHandler } from './use-remove-item'
import useCart from './use-cart'

export type UpdateItemInput<T = any> = T extends LineItem
  ? Partial<UpdateItemInputBase<LineItem>>
  : UpdateItemInputBase<LineItem>

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'PUT',
  },
  async fetcher({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateCartItemBody>) {
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

    const data = await fetch<BigcommerceCart, UpdateCartItemBody>({
      ...options,
      body: { itemId, item },
    })

    return normalizeCart(data)
  },
  useHook: ({
    fetch,
  }: MutationHookContext<Cart | null, UpdateCartItemBody>) => <
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
      debounce(async (input: UpdateItemInput<T>) => {
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
            itemId,
            item: { productId, variantId, quantity: input.quantity },
          },
        })
        await mutate(data, false)
        return data
      }, ctx.wait ?? 500),
      [fetch, mutate]
    )
  },
}
