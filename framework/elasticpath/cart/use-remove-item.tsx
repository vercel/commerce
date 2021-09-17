import { useCallback } from 'react'

import { MutationHook } from '@commerce/utils/types'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import useCart from './use-cart'
import epClient from '../utils/ep-client'
import normalizeCart from '../utils/normalize-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input }) {
    return epClient.Cart().RemoveItem(input.id);
  },
  useHook: ({ fetch }) => () => {
    const { mutate } = useCart()

    return useCallback(
      async function addItem(input) {
        const data = await fetch({ input })
        const cartData = normalizeCart(data, await epClient.Cart().Items());
        await mutate(cartData, true)
        return cartData
      },
      [fetch, mutate]
    )
  },
}
