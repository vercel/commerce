import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import { CommerceError } from '@commerce/utils/errors'
import useAddItem, { UseAddItem } from '@commerce/cart/use-add-item'
import type { Cart, CartItemBody, AddCartItemBody } from '../types'
import useCart from './use-cart'

export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<Cart, {}, CartItemBody> = {
  fetchOptions: {
    url: '/api/reactioncommerce/cart',
    method: 'POST',
  },
  async fetcher({ input: item, options, fetch }) {
    console.log('add cart item', item)

    if (
      item.quantity &&
      (!Number.isInteger(item.quantity) || item.quantity! < 1)
    ) {
      throw new CommerceError({
        message: 'The item quantity has to be a valid integer greater than 0',
      })
    }

    const data = await fetch<Cart, AddCartItemBody>({
      ...options,
      body: { item },
    })

    return data
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
