import { HookFetcher } from '@lib/commerce/utils/types'
import useData from '@lib/commerce/utils/use-data'
import type { Wishlist } from '../api/wishlist'

const defaultOpts = {
  url: '/api/bigcommerce/wishlists',
  method: 'GET',
}

export type { Wishlist }

export type WishlistInput = {
  wishlistId: string | undefined
}

export const fetcher: HookFetcher<Wishlist | null, WishlistInput> = (
  options,
  { wishlistId },
  fetch
) => {
  return fetch({
    ...defaultOpts,
    ...options,
    body: { wishlistId },
  })
}

export function extendHook(customFetcher: typeof fetcher) {
  const useWishlists = (wishlistId: string) => {
    const fetchFn: typeof fetcher = (options, input, fetch) => {
      return customFetcher(options, input, fetch)
    }
    const response = useData(defaultOpts, [['wishlistId', wishlistId]], fetchFn)

    return response
  }

  useWishlists.extend = extendHook

  return useWishlists
}

export default extendHook(fetcher)
