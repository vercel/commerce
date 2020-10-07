import type { Fetcher } from '@lib/commerce'
import { default as useCartRemoveItem } from '@lib/commerce/cart/use-remove-item'
import type { ItemBody, RemoveItemBody } from '../api/cart'
import { Cart, useCart } from '.'

export type { ItemBody, RemoveItemBody }

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

export default function useRemoveItem() {
  const { mutate } = useCart()
  const fn = useCartRemoveItem<Cart | null, RemoveItemBody>(fetcher)
  const removeItem: typeof fn = async (input) => {
    const data = await fn(input)
    await mutate(data, false)
    return data
  }

  return removeItem
}
