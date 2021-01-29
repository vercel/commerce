import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceSearch from '@commerce/products/use-search'
import { ProductEdge } from '../types'

const defaultOpts = {}

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export type SearchProductsData = {
  products: ProductEdge[]
  found: boolean
}

export const fetcher: HookFetcher<SearchProductsData, SearchProductsInput> = (
  options,
  { search, categoryId, brandId, sort },
  fetch
) => {
  return { found: false, products: [] }
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<SearchProductsData, SearchProductsInput>
) {
  const useSearch = (input: SearchProductsInput = {}) => {
    return {}
  }

  useSearch.extend = extendHook

  return useSearch
}

export default extendHook(fetcher)
