import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { GetWishlistHook } from '../types/wishlist'
import type { Provider } from '..'

export type UseWishlist<
  H extends SWRHook<GetWishlistHook<any>> = SWRHook<GetWishlistHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<GetWishlistHook> = SWRFetcher

const fn = (provider: Provider) => provider.wishlist?.useWishlist!

const useWishlist: UseWishlist = (...args) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(...args)
}

export default useWishlist
