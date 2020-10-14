import { ConfigInterface } from 'swr'
import { HookFetcher } from '@lib/commerce/utils/types'
import useCommerceSearch from '@lib/commerce/products/use-search'
import type { SearchProductsData } from '../api/catalog/products'

const defaultOpts = {
  url: '/api/bigcommerce/catalog/products',
  method: 'GET',
}

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
}

export const fetcher: HookFetcher<SearchProductsData, SearchProductsInput> = (
  options,
  { search, categoryId, brandId },
  fetch
) => {
  // Use a dummy base as we only care about the relative path
  const url = new URL(options?.url ?? defaultOpts.url, 'http://a')

  if (search) url.searchParams.set('search', search)
  if (Number.isInteger(categoryId))
    url.searchParams.set('category', String(categoryId))
  if (Number.isInteger(categoryId))
    url.searchParams.set('brand', String(brandId))

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
    const response = useCommerceSearch<SearchProductsData>(
      defaultOpts,
      [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
      ],
      customFetcher,
      { revalidateOnFocus: false, ...swrOptions }
    )

    return response
  }

  useSearch.extend = extendHook

  return useSearch
}

export default extendHook(fetcher)
