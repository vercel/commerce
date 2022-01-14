import type { UpdateItemHook, LineItem } from '@vercel/commerce/types/cart'
import type {
  HookFetcherContext,
  MutationHookContext,
} from '@vercel/commerce/utils/types'
import { ValidationError } from '@vercel/commerce/utils/errors'
import debounce from 'lodash.debounce'
import { useCallback } from 'react'
import useUpdateItem, { UseUpdateItem } from '@vercel/commerce/cart/use-update-item'
import type { CommercejsCart } from '../types/cart'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useUpdateItem as UseUpdateItem<typeof handler>

export type UpdateItemActionInput<T = any> = T extends LineItem
  ? Partial<UpdateItemHook['actionInput']>
  : UpdateItemHook['actionInput']

export const handler = {
  fetchOptions: {
    query: 'cart',
    method: 'update',
  },
  async fetcher({ input, options, fetch }: HookFetcherContext<UpdateItemHook>) {
    const variables = [input.itemId, { quantity: input.item.quantity }]
    const { cart } = await fetch<{ cart: CommercejsCart }>({
      query: options.query,
      method: options.method,
      variables,
    })
    return normalizeCart(cart)
  },
  useHook:
    ({ fetch }: MutationHookContext<UpdateItemHook>) =>
    <T extends LineItem | undefined = undefined>(
      ctx: {
        item?: T
        wait?: number
      } = {}
    ) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const { mutate } = useCart() as any
      const { item } = ctx

      // eslint-disable-next-line react-hooks/rules-of-hooks
      return useCallback(
        debounce(async (input: UpdateItemActionInput<T>) => {
          const itemId = input.id ?? item?.id
          const productId = input.productId ?? item?.productId
          const variantId = input.productId ?? item?.variantId
          const quantity = input?.quantity ?? item?.quantity

          if (!itemId || !productId || !variantId) {
            throw new ValidationError({
              message: 'Invalid input for updating cart item',
            })
          }

          const cart = await fetch({
            input: {
              itemId,
              item: {
                quantity,
                productId,
                variantId,
              },
            },
          })
          await mutate(cart, false)
          return cart
        }, ctx.wait ?? 500),
        [mutate, item]
      )
    },
}
