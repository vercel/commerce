import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { Customer } from '../types'
import { Provider } from '..'

export type UseCustomer<
  H extends SWRHook<any, any, any> = SWRHook<Customer | null>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<Customer | null, any> = SWRFetcher

const fn = (provider: Provider) => provider.customer?.useCustomer!

const useCustomer: UseCustomer = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useCustomer
