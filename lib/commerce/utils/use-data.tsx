import useSWR, { ConfigInterface, responseInterface } from 'swr'
import type { HookInput, HookFetcher, HookFetcherOptions } from './types'
import { CommerceError } from './errors'
import { useCommerce } from '..'

export type SwrOptions<Result, Input = null> = ConfigInterface<
  Result,
  CommerceError,
  HookFetcher<Result, Input>
>

export type UseData = <Result = any, Input = null>(
  options: HookFetcherOptions | (() => HookFetcherOptions | null),
  input: HookInput,
  fetcherFn: HookFetcher<Result, Input>,
  swrOptions?: SwrOptions<Result, Input>
) => responseInterface<Result, CommerceError>

const useData: UseData = (options, input, fetcherFn, swrOptions) => {
  const { fetcherRef } = useCommerce()
  const fetcher = (
    url?: string,
    query?: string,
    method?: string,
    ...args: any[]
  ) => {
    return fetcherFn(
      { url, query, method },
      // Transform the input array into an object
      args.reduce((obj, val, i) => {
        obj[input[i][0]!] = val
        return obj
      }, {}),
      fetcherRef.current
    )
  }
  const response = useSWR(
    () => {
      const opts = typeof options === 'function' ? options() : options
      return opts
        ? [opts.url, opts.query, opts.method, ...input.map((e) => e[1])]
        : null
    },
    fetcher,
    swrOptions
  )

  return response
}

export default useData
