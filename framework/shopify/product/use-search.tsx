import useCommerceSearch from '@commerce/products/use-search'
import {
  getAllProductsQuery,
  getCollectionProductsQuery,
} from '@framework/utils/queries'

import type { Product } from 'framework/bigcommerce/schema'
import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import type { ProductEdge } from '@framework/schema'

import getSearchVariables from '@framework/utils/get-search-variables'

import { normalizeProduct } from '@framework/lib/normalize'

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
}

export type SearchRequestProductsData = {
  products?: ProductEdge[]
}

export type SearchProductsData = {
  products: Product[]
  found: boolean
}

export const fetcher: HookFetcher<
  SearchRequestProductsData,
  SearchProductsInput
> = (options, input, fetch) => {
  return fetch({
    query: options?.query,
    method: options?.method,
    variables: {
      ...getSearchVariables(input),
    },
  }).then(
    (resp): SearchProductsData => {
      const edges = resp.products?.edges

      return {
        products: edges?.map(({ node: p }: ProductEdge) => normalizeProduct(p)),
        found: !!edges?.length,
      }
    }
  )
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<SearchProductsData, SearchProductsInput>
) {
  const useSearch = (input: SearchProductsInput = {}) => {
    const response = useCommerceSearch(
      {
        query: getAllProductsQuery,
      },
      [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort],
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
