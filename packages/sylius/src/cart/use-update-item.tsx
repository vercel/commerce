import {
  HookFetcherContext,
  MutationHook,
  MutationHookContext,
} from '@vercel/commerce/utils/types'
import useUpdateItem, {
  UseUpdateItem,
} from '@vercel/commerce/cart/use-update-item'
import { getCartToken } from '../utils/token/cart-token'
import { useCallback } from 'react'
import useCart from './use-cart'
import { LineItem, UpdateItemHook } from '@vercel/commerce/types/cart'
import { ValidationError } from '@vercel/commerce/utils/errors'
import { normalizeCart } from '../utils/normalize/normalize-cart'

export default useUpdateItem as UseUpdateItem<any>

export const handler: MutationHook<any> = {
  fetchOptions: {
    url: '/api/v2/shop/orders',
    method: 'PATCH',
  },
  fetcher: async ({
    input: { itemId, item },
    options,
    fetch,
  }: HookFetcherContext<UpdateItemHook>) => {
    const syliusCart = await fetch({
      url: `${options.url}/${getCartToken()}/items/${itemId}`,
      method: options.method,
      body: {
        quantity: item.quantity,
      },
      variables: {
        contentType: 'application/merge-patch+json',
      },
    })
    return normalizeCart(syliusCart)
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
      const { mutate, data: cartData } = useCart() as any

      return useCallback(
        async function addItem(input) {
          const firstLineItem = cartData.lineItems[0]
          const itemId = item?.id || firstLineItem.id
          const productId = item?.productId || firstLineItem.productId
          const variantId = item?.variant.id || firstLineItem.variant.id
          if (!itemId) {
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
          console.log('update quantity', data)
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
