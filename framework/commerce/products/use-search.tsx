import type { SearchProductsData } from '../types'
import type {
  Prop,
  HookFetcherFn,
  UseHookInput,
  UseHookResponse,
} from '../utils/types'
import defaultFetcher from '../utils/default-fetcher'
import useData from '../utils/use-data-2'
import { Provider, useCommerce } from '..'
import { BigcommerceProvider } from '@framework'

export type UseSearchHandler<P extends Provider> = Prop<
  Prop<P, 'products'>,
  'useSearch'
>

export type UseSeachInput<P extends Provider> = UseHookInput<
  UseSearchHandler<P>
>

export type SearchResponse<P extends Provider> = UseHookResponse<
  UseSearchHandler<P>
>

export type UseSearch<P extends Provider> = Partial<
  UseSeachInput<P>
> extends UseSeachInput<P>
  ? (input?: UseSeachInput<P>) => SearchResponse<P>
  : (input: UseSeachInput<P>) => SearchResponse<P>

export const fetcher = defaultFetcher as HookFetcherFn<SearchProductsData>

export default function useSearch<P extends Provider>(
  input: UseSeachInput<P> = {}
) {
  const { providerRef, fetcherRef } = useCommerce<P>()

  const provider = providerRef.current
  const opts = provider.products?.useSearch

  const fetcherFn = opts?.fetcher ?? fetcher
  const useHook = opts?.useHook ?? ((ctx) => ctx.useData())

  return useHook({
    input,
    useData(ctx) {
      const response = useData(
        { ...opts!, fetcher: fetcherFn },
        ctx?.input ?? [],
        provider.fetcher ?? fetcherRef.current,
        ctx?.swrOptions ?? input.swrOptions
      )
      return response
    },
  })
}
