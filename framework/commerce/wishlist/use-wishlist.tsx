import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { Wishlist } from '../types'
import type { Provider } from '..'

export type UseWishlist<
  H extends SWRHook<any, any, any> = SWRHook<
    Wishlist | null,
    { includeProducts?: boolean },
    { customerId?: number; includeProducts: boolean },
    { isEmpty?: boolean }
  >
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<Wishlist | null, any> = SWRFetcher

const fn = (provider: Provider) => provider.wishlist?.useWishlist!

const useWishlist: UseWishlist = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useWishlist
