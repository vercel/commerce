import { useCallback } from 'react'
import type { MutationHook } from '@vercel/commerce/utils/types'
import useRemoveItem from '@vercel/commerce/wishlist/use-remove-item'
import type { UseRemoveItem } from '@vercel/commerce/wishlist/use-remove-item'
import type { RemoveItemHook } from '@vercel/commerce/types/wishlist'
import useWishlist from './use-wishlist'
import isLoggedIn from '../utils/tokens/is-logged-in'
import ensureIToken from '../utils/tokens/ensure-itoken'
import type { IToken } from '@spree/storefront-api-v2-sdk/types/interfaces/Token'
import type { GraphQLFetcherResult } from '@vercel/commerce/api'
import type { WishedItem } from '@spree/storefront-api-v2-sdk/types/interfaces/WishedItem'

export default useRemoveItem as UseRemoveItem<typeof handler>

export const handler: MutationHook<RemoveItemHook> = {
  fetchOptions: {
    url: 'wishlists',
    query: 'removeWishedItem',
  },
  async fetcher({ input, options, fetch }) {
    console.info(
      'useRemoveItem (wishlist) fetcher called. Configuration: ',
      'input: ',
      input,
      'options: ',
      options
    )

    const { itemId, wishlistToken } = input

    if (!isLoggedIn() || !wishlistToken) {
      return null
    }

    let token: IToken | undefined = ensureIToken()

    await fetch<GraphQLFetcherResult<WishedItem>>({
      variables: {
        methodPath: 'wishlists.removeWishedItem',
        arguments: [token, wishlistToken, itemId],
      },
    })

    return null
  },
  useHook: ({ fetch }) => {
    const useWrappedHook: ReturnType<
      MutationHook<RemoveItemHook>['useHook']
    > = () => {
      const wishlist = useWishlist()

      return useCallback(
        async (input) => {
          if (!wishlist.data) {
            return null
          }

          const data = await fetch({
            input: {
              itemId: `${input.id}`,
              wishlistToken: wishlist.data.token,
            },
          })

          await wishlist.mutate()

          return data
        },
        [wishlist]
      )
    }

    return useWrappedHook
  },
}
