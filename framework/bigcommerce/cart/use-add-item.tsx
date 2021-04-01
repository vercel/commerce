import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { normalizeCart } from '../lib/normalize'
import type { BigcommerceCart, AddItemHook, CartTypes } from '../types/cart'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    url: '/api/bigcommerce/cart',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch<BigcommerceCart>({
      ...options,
      body: { item },
    })

    return normalizeCart(data)
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
