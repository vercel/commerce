import { Fetcher } from '@lib/commerce'
import { default as useCartAddItem } from '@lib/commerce/cart/use-add-item'
import { Cart } from '.'

async function fetcher(fetch: Fetcher<Cart>, { item }: { item: any }) {
  const res = await fetch({ url: '/api/cart' })

  // {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({ product }),
  // }
}

export default function useAddItem() {
  return useCartAddItem<Cart, { item: any }>(fetcher)
}
