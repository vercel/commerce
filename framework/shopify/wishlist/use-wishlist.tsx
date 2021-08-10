import { useMemo } from 'react'
import { SWRHook } from '@commerce/utils/types'
import useWishlist, { UseWishlist } from '@commerce/wishlist/use-wishlist'
import type { GetWishlistHook } from '../types/wishlist'
import { getWishlistId, normalizeWishlist, getWishlistQuery } from '../utils'
import { GetCartQueryVariables, QueryRoot } from '../schema'
import Cookies from 'js-cookie'
import { SHOPIFY_WHISLIST_ID_COOKIE } from '../const'

export default useWishlist as UseWishlist<typeof handler>

export const handler: SWRHook<GetWishlistHook> = {
  fetchOptions: {
    query: getWishlistQuery,
  },
  async fetcher({ input: _input, options, fetch }) {
    const wishListId = getWishlistId()
    if (wishListId) {
      const { cart: wishlist } = await fetch<QueryRoot, GetCartQueryVariables>({
        ...options,
        variables: { cartId: wishListId },
      })
      if (wishlist) {
        return normalizeWishlist(wishlist)
      } else {
        Cookies.remove(SHOPIFY_WHISLIST_ID_COOKIE)
      }
    }
    return null
  },
  useHook:
    ({ useData }) =>
    (input) => {
      const response = useData({
        input: [],
        swrOptions: {
          revalidateOnFocus: false,
          ...input?.swrOptions,
        },
      })

      return useMemo(
        () =>
          Object.create(response, {
            isEmpty: {
              get() {
                return (response.data?.items?.length || 0) <= 0
              },
              enumerable: true,
            },
          }),
        [response]
      )
    },
}
