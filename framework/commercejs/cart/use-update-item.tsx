import type { UpdateItemHook, LineItem } from '@commerce/types/cart'
import type { MutationHook, MutationHookContext } from '@commerce/utils/types'

import { useCallback } from 'react'
import useUpdateItem, { UseUpdateItem } from '@commerce/cart/use-update-item'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useUpdateItem as UseUpdateItem<typeof handler>

export const handler: MutationHook<UpdateItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'update',
  },
  async fetcher({ input, options, fetch }) {
    const variables = [input.itemId, { quantity: input.item.quantity }]
    const { cart } = await fetch({
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
      const { mutate } = useCart() as any
      const { item } = ctx

      // TODO - debounce this function.

      return useCallback(
        async function addItem(input) {
          const itemId = input.id ?? item?.id
          const productId = input.productId ?? item?.productId
          const variantId = input.productId ?? item?.variantId

          const cart = await fetch({
            input: {
              itemId,
              item: {
                productId,
                variantId: variantId as string,
                quantity: input?.quantity,
              },
            },
          })
          await mutate(cart, false)
          return cart
        },
        [mutate, item]
      )
    },
}
