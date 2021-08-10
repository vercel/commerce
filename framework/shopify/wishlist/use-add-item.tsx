import { useCallback } from 'react'
import type { MutationHook } from '@commerce/utils/types'
import useAddItem, { UseAddItem } from '@commerce/wishlist/use-add-item'

import type { AddItemHook } from '../types/wishlist'

import {
  getWishlistId,
  normalizeCart,
  normalizeWishlist,
  throwUserErrors,
  wishlistCreate,
  wishlistLineItemAddMutation,
} from '../utils'

import { CartLinesAddMutation, CartLinesAddMutationVariables } from '../schema'

import useWishlist from './use-wishlist'
export default useAddItem as UseAddItem<typeof handler>

export const handler: MutationHook<AddItemHook> = {
  fetchOptions: {
    query: wishlistLineItemAddMutation,
  },
  async fetcher({ input, options, fetch }) {
    const lines = [
      {
        merchandiseId: String(input.item.variantId || input.item.productId),
        quantity: 1,
      },
    ]

    let wishlistId = getWishlistId()

    if (!wishlistId) {
      const cart = await wishlistCreate(fetch, lines)
      return normalizeCart(cart)
    } else {
      const { cartLinesAdd } = await fetch<
        CartLinesAddMutation,
        CartLinesAddMutationVariables
      >({
        ...options,
        variables: {
          cartId: wishlistId,
          lines,
        },
      })

      throwUserErrors(cartLinesAdd?.userErrors)

      return normalizeWishlist(cartLinesAdd?.cart)
    }
  },
  useHook:
    ({ fetch }) =>
    () => {
      const { mutate } = useWishlist()

      return useCallback(
        async function addItem(item) {
          const data = await fetch({ input: { item } })
          await mutate(data, false)
          return data
        },
        [fetch, mutate]
      )
    },
}
