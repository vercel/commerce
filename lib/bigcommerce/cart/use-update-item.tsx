import type { Fetcher } from '@lib/commerce'
import { default as useCartUpdateItem } from '@lib/commerce/cart/use-update-item'
import type { ItemBody, UpdateItemBody } from '../api/cart'
import { fetcher as removeFetcher } from './use-remove-item'
import { Cart, useCart } from '.'

export type UpdateItemInput = Partial<{ id: string } & ItemBody>

function fetcher(
  fetch: Fetcher<Cart | null>,
  { itemId, item }: UpdateItemBody
) {
  if (Number.isInteger(item.quantity)) {
    // Also allow the update hook to remove an item if the quantity is lower than 1
    if (item.quantity! < 1) {
      return removeFetcher(fetch, { itemId })
    }
  } else if (item.quantity) {
    throw new Error('The item quantity has to be a valid integer')
  }

  return fetch({
    url: '/api/bigcommerce/cart',
    method: 'PUT',
    body: { itemId, item },
  })
}

export default function useUpdateItem(item: any = {}) {
  const { mutate } = useCart()
  const fn = useCartUpdateItem<Cart | null, UpdateItemBody>(fetcher)
  const updateItem = async (input: UpdateItemInput) => {
    const data = await fn({
      itemId: input.id ?? item.id,
      item: {
        productId: input.productId ?? item.product_id,
        variantId: input.productId ?? item.variant_id,
        quantity: input.quantity,
      },
    })
    await mutate(data, false)
    return data
  }

  return updateItem
}
