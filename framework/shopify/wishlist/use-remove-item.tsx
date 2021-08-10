import { useCallback } from 'react'
import type { HookFetcherContext, MutationHook } from '@commerce/utils/types'

import useRemoveItem, {
  UseRemoveItem,
} from '@commerce/wishlist/use-remove-item'
import type { RemoveItemHook } from '../types/wishlist'

export default useRemoveItem as UseRemoveItem<typeof handler>

import {
  getCartId,
  getWishlistId,
  normalizeWishlist,
  throwUserErrors,
} from '../utils'

import {
  CartLinesRemoveMutation,
  CartLinesRemoveMutationVariables,
} from '../schema'

import useWishlist from './use-wishlist'
import wishlistLinesRemoveMutation from '../utils/mutations/wishlist-line-item-remove'

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    query: wishlistLinesRemoveMutation,
  },
  async fetcher({
    input: { itemId },
    options,
    fetch,
  }: HookFetcherContext<RemoveItemHook>) {
    const { cartLinesRemove } = await fetch<
      CartLinesRemoveMutation,
      CartLinesRemoveMutationVariables
    >({
      ...options,
      variables: { cartId: getWishlistId(), lineIds: [itemId] },
    })

    throwUserErrors(cartLinesRemove?.userErrors)

    return normalizeWishlist(cartLinesRemove?.cart)
  },

  useHook:
    ({ fetch }) =>
    ({ wishlist } = {}) => {
      const { revalidate } = useWishlist(wishlist)

      return useCallback(
        async function removeItem(input) {
          const data = await fetch({ input: { itemId: String(input.id) } })
          await revalidate()
          return data
        },
        [fetch, revalidate]
      )
    },
}
