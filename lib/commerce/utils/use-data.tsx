import useSWR, { ConfigInterface } from 'swr'
import type { HookInput, HookFetcher, HookFetcherOptions } from './types'
import { useCommerce } from '..'

export default function useData<T, Input = any>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<T, Input>,
  swrOptions?: ConfigInterface<T>
) {
  const { fetcherRef } = useCommerce()
  const fetcher = (url?: string, query?: string, ...args: any[]) =>
    fetcherFn(
      { url, query },
      args.reduce((obj, val, i) => {
        obj[input[i][1]!] = val
        return obj
      }, {}),
      fetcherRef.current
    )
  const response = useSWR(
    [options.url, options.query, ...input.map((e) => e[1])],
    fetcher,
    swrOptions
  )

  return response
}
