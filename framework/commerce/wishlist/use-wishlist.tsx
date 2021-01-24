import type { responseInterface } from 'swr'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import useData, { SwrOptions } from '../utils/use-data'

export type WishlistResponse<Result> = responseInterface<Result, Error> & {
  isEmpty: boolean
}

export default function useWishlist<Result, Input = null>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<Result, Input>,
  swrOptions?: SwrOptions<Result, Input>
) {
  const response = useData(options, input, fetcherFn, swrOptions)
  return Object.assign(response, { isEmpty: true }) as WishlistResponse<Result>
}
