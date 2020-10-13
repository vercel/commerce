import useSWR, { responseInterface, ConfigInterface } from 'swr'
import Cookies from 'js-cookie'
import type { HookInput, HookFetcher, HookFetcherOptions } from '../utils/types'
import { useCommerce } from '..'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

export default function useCart<T>(
  options: HookFetcherOptions,
  input: HookInput,
  fetcherFn: HookFetcher<T, any>,
  swrOptions?: ConfigInterface<T | null>
) {
  const { fetcherRef, cartCookie } = useCommerce()
  const fetcher = (url?: string, query?: string, ...args: any[]) =>
    Cookies.get(cartCookie)
      ? fetcherFn(
          { url, query },
          args.reduce((obj, val, i) => {
            obj[input[i][1]!] = val
            return obj
          }, {}),
          fetcherRef.current
        )
      : null
  const response = useSWR(
    [options.url, options.query, ...input.map((e) => e[1])],
    fetcher,
    swrOptions
  )

  return Object.assign(response, { isEmpty: true }) as CartResponse<T>
}
