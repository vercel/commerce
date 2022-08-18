import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { VendorHook } from '../types/vendors'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { Provider } from '..'

export type UseVendors<
  H extends SWRHook<VendorHook<any>> = SWRHook<VendorHook>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<VendorHook> = SWRFetcher

const fn = (provider: Provider) => provider.vendors?.useVendors!

const useVendors: UseVendors = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useVendors
