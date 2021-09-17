import { useCallback } from 'react'

import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import { MutationHook } from '@commerce/utils/types'
import useCart from './use-cart'
import epClient from '../utils/ep-client'
import normalizeCart from '../utils/normalize-cart'

export default useAddItem as UseAddItem<typeof handler>
export const handler: MutationHook<any> = {
  fetchOptions: {
    query: '',
  },
  async fetcher({ input, options, fetch }) {
    return epClient.Cart().AddProduct(input.productId);
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