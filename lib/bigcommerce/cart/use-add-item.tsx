import { useCallback } from 'react'
import type { Fetcher } from '@lib/commerce'
import { default as useCartAddItem } from '@lib/commerce/cart/use-add-item'
import type { ItemBody, AddItemBody } from '../api/cart'
import { Cart, useCart } from '.'

export type UpdateItemInput = ItemBody

function fetcher(fetch: Fetcher<Cart>, { item }: AddItemBody) {
  if (
    item.quantity &&
    (!Number.isInteger(item.quantity) || item.quantity! < 1)
  ) {
    throw new Error(
      'The item quantity has to be a valid integer greater than 0'
    )
  }

  return fetch({ url: '/api/bigcommerce/cart', method: 'POST', body: { item } })
}

export default function useAddItem() {
  const { mutate } = useCart()
  const fn = useCartAddItem<Cart, AddItemBody>(fetcher)

  return useCallback(
    async function addItem(input: UpdateItemInput) {
      const data = await fn({ item: input })
      await mutate(data, false)
      return data
    },
    [fn, mutate]
  )
}
