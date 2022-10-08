import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { CustomerHook } from '../types/customer'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { Provider } from '..'

export type UseCustomer<
  H extends SWRHook<CustomerHook<any>> = SWRHook<CustomerHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<CustomerHook> = SWRFetcher

const fn = (provider: Provider) => provider.customer?.useCustomer!

const useCustomer: UseCustomer = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useCustomer
