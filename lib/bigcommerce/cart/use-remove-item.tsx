import { useCallback } from 'react'
import type { Fetcher } from '@lib/commerce'
import { default as useCartRemoveItem } from '@lib/commerce/cart/use-remove-item'
import type { RemoveItemBody } from '../api/cart'
import { Cart, useCart } from '.'

export type RemoveItemInput = {
  id: string
}

export function fetcher(
  fetch: Fetcher<Cart | null>,
  { itemId }: RemoveItemBody
) {
  return fetch({
    url: '/api/bigcommerce/cart',
    method: 'DELETE',
    body: { itemId },
  })
}

export default function useRemoveItem(item?: any) {
  const { mutate } = useCart()
  const fn = useCartRemoveItem<Cart | null, RemoveItemBody>(fetcher)

  return useCallback(
    async function removeItem(input: RemoveItemInput) {
      const data = await fn({ itemId: input.id ?? item?.id })
      await mutate(data, false)
      return data
    },
    [fn, mutate]
  )
}
