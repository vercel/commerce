import type { Fetcher } from '@lib/commerce'
import { default as useCartAddItem } from '@lib/commerce/cart/use-add-item'
import { Cart } from '.'

async function fetcher(fetch: Fetcher<Cart>, { item }: { item: any }) {
  return fetch({ url: '/api/cart', method: 'POST', body: { item } })
}

export default function useAddItem() {
  return useCartAddItem<Cart, { item: any }>(fetcher)
}
