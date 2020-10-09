import useSWR, { responseInterface, ConfigInterface } from 'swr'
import Cookies from 'js-cookie'
import { HookDeps, HookFetcher } from '../utils/types'
import { useCommerce } from '..'

export type CartResponse<C> = responseInterface<C, Error> & {
  isEmpty: boolean
}

export function useCart<T>(
  deps: [string | undefined, string | undefined, ...HookDeps[]],
  fetcherFn: HookFetcher<T, HookDeps[]>,
  swrOptions?: ConfigInterface<T | null>
) {
  const { fetcherRef, cartCookie } = useCommerce()
  const fetcher = (url?: string, query?: string, ...args: HookDeps[]) =>
    Cookies.get(cartCookie)
      ? fetcherFn({ url, query }, args, fetcherRef.current)
      : null
  const response = useSWR(deps, fetcher, swrOptions)

  return Object.assign(response, { isEmpty: true }) as CartResponse<T>
}
