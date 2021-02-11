import type { Wishlist } from '../types'
import type {
  Prop,
  HookFetcherFn,
  UseHookInput,
  UseHookResponse,
} from '../utils/types'
import defaultFetcher from '../utils/default-fetcher'
import useData from '../utils/use-data-2'
import { Provider, useCommerce } from '..'

export type UseWishlistHandler<P extends Provider> = Prop<
  Prop<P, 'wishlist'>,
  'useWishlist'
>

export type UseWishlistInput<P extends Provider> = UseHookInput<
  UseWishlistHandler<P>
>

export type WishlistResponse<P extends Provider> = UseHookResponse<
  UseWishlistHandler<P>
>

export type UseWishlist<P extends Provider> = Partial<
  UseWishlistInput<P>
> extends UseWishlistInput<P>
  ? (input?: UseWishlistInput<P>) => WishlistResponse<P>
  : (input: UseWishlistInput<P>) => WishlistResponse<P>

export const fetcher = defaultFetcher as HookFetcherFn<Wishlist | null>

export default function useWishlist<P extends Provider>(
  input: UseWishlistInput<P> = {}
) {
  const { providerRef, fetcherRef } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.wishlist?.useWishlist

  const fetcherFn = opts?.fetcher ?? fetcher
  const useHook = opts?.useHook ?? ((ctx) => ctx.useData())

  return useHook({
    input,
    useData(ctx) {
      const response = useData(
        { ...opts!, fetcher: fetcherFn },
        ctx?.input ?? [],
        provider.fetcher ?? fetcherRef.current,
        ctx?.swrOptions ?? input.swrOptions
      )
      return response
    },
  })
}
