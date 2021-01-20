import type { responseInterface } from 'swr'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import useData, { ResponseState, SwrOptions } from '../utils/use-data'

export type WishlistResponse<Result> = ResponseState<Result> & {
  isEmpty?: boolean
}

export default function useWishlist<Result, Input = null>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<Result, Input>,
  swrOptions?: SwrOptions<Result, Input>
): WishlistResponse<Result> {
  const response = useData(options, input, fetcherFn, swrOptions)
  return response
}
