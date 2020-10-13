import useSWR, { ConfigInterface } from 'swr'
import { HookDeps, HookFetcher } from '@lib/commerce/utils/types'
import useCommerceSearch from '@lib/commerce/products/use-search'
import type { Product } from '../api/catalog/products'
import { useCommerce } from '..'

const defaultOpts = {
  url: '/api/bigcommerce/catalog/products',
  method: 'GET',
}

export type SearchProductsInput = {
  search?: string
}

export const fetcher: HookFetcher<Product[], SearchProductsInput> = (
  options,
  { search },
  fetch
) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  if (search) url.searchParams.set('search', search)

  return fetch({
    url: url.pathname + url.search,
    method: options?.method ?? defaultOpts.method,
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: ConfigInterface
) {
  const useSearch = (input: SearchProductsInput = {}) => {
    const response = useCommerceSearch<Product[]>(
      defaultOpts,
      [['search', input.search]],
      customFetcher,
      { revalidateOnFocus: false, ...swrOptions }
    )

    return response
  }

  useSearch.extend = extendHook

  return useSearch
}

export default extendHook(fetcher)
