import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import useCart from './use-cart'
import { Cart, CartItemBody } from '../types'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<Cart, {}, CartItemBody> = {
  fetchOptions: {
    query: ``,
  },
  async fetcher() {
    return {} as Promise<Cart>
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCart()

    return useCallback(
      async function addItem(input) {
        const data = await fetch({ input })
        await mutate(data, false)
        return data
      },
      [fetch, mutate]
    )
  },
}
