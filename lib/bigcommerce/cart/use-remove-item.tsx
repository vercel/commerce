import type { Fetcher } from '@lib/commerce'
import { default as useCartRemoveItem } from '@lib/commerce/cart/use-remove-item'
import type { ItemBody, RemoveItemBody } from '../api/cart'
import { Cart, useCart } from '.'

export type { ItemBody, RemoveItemBody }

function fetcher(fetch: Fetcher<Cart>, { itemId }: RemoveItemBody) {
  return fetch({
    url: '/api/bigcommerce/cart',
    method: 'DELETE',
    body: { itemId },
  })
}

export default function useRemoveItem() {
  const { mutate } = useCart()
  const fn = useCartRemoveItem<Cart, RemoveItemBody>(fetcher)
  const removeItem: typeof fn = async (input) => {
    const data = await fn(input)
    mutate(data)
    return data
  }

  return removeItem
}
