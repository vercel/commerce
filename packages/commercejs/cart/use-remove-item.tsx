import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import type { RemoveItemHook } from '@commerce/types/cart'
import useRemoveItem, { UseRemoveItem } from '@commerce/cart/use-remove-item'
import type { CommercejsCart } from '../types/cart'
import { normalizeCart } from '../utils/normalize-cart'
import useCart from './use-cart'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    query: 'cart',
    method: 'remove',
  },
  async fetcher({ input, options, fetch }) {
    const { cart } = await fetch<{ cart: CommercejsCart }>({
      query: options.query,
      method: options.method,
      variables: input.itemId,
    })
    return normalizeCart(cart)
  },
  useHook: ({ fetch }) =>
    function useHook() {
      const { mutate } = useCart()
      return useCallback(
        async function removeItem(input) {
          const cart = await fetch({ input: { itemId: input.id } })
          await mutate(cart, false)
          return cart
        },
        [mutate]
      )
    },
}
