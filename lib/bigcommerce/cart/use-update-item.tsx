import type { Fetcher } from '@lib/commerce'
import { default as useCartUpdateItem } from '@lib/commerce/cart/use-update-item'
import type { Item } from '../api/cart'
import { Cart, useCart } from '.'

export type { Item }

export type UpdateItemInput = {
  itemId: string
  item: Item
}

function fetcher(fetch: Fetcher<Cart>, { itemId, item }: UpdateItemInput) {
  if (
    item.quantity &&
    (!Number.isInteger(item.quantity) || item.quantity! < 1)
  ) {
    throw new Error(
      'The item quantity has to be a valid integer greater than 0'
    )
  }

  return fetch({
    url: '/api/bigcommerce/cart',
    method: 'PUT',
    body: { itemId, item },
  })
}

export default function useUpdateItem() {
  const { mutate } = useCart()
  const fn = useCartUpdateItem<Cart, UpdateItemInput>(fetcher)
  const updateItem: typeof fn = async (input) => {
    const data = await fn(input)
    mutate(data)
    return data
  }

  return updateItem
}
