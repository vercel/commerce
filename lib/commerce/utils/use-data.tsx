import useSWR, { ConfigInterface } from 'swr'
import type { HookInput, HookFetcher, HookFetcherOptions } from './types'
import { useCommerce } from '..'

export default function useData<T, Input = any>(
  options: HookFetcherOptions | (() => HookFetcherOptions | null),
  input: HookInput,
  fetcherFn: HookFetcher<T, Input>,
  swrOptions?: ConfigInterface<T>
) {
  const { fetcherRef } = useCommerce()
  const fetcher = (url?: string, query?: string, ...args: any[]) => {
    return fetcherFn(
      { url, query },
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
      return opts ? [opts.url, opts.query, ...input.map((e) => e[1])] : null
    },
    fetcher,
    swrOptions
  )

  return response
}
