import { useHook, useSWRHook } from '../utils/use-hook'
import { SWRFetcher } from '../utils/default-fetcher'
import type { HookFetcherFn, SWRHook } from '../utils/types'
import type { SearchProductsData } from '../types'
import { Provider } from '..'

export type UseSearch<
  H extends SWRHook<any, any, any> = SWRHook<SearchProductsData>
> = ReturnType<H['useHook']>

export const fetcher: HookFetcherFn<SearchProductsData, any> = SWRFetcher

const fn = (provider: Provider) => provider.products?.useSearch!

const useSearch: UseSearch = (input) => {
  const hook = useHook(fn)
  return useSWRHook({ fetcher, ...hook })(input)
}

export default useSearch
