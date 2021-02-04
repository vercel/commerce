import useCommerceSearch from '@commerce/products/use-search'
import getAllProductsQuery from '@framework/utils/queries/get-all-products-query'

import type { Product } from 'framework/bigcommerce/schema'
import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import type { ProductEdge } from '@framework/schema'

import {
  searchByProductType,
  searchByTag,
} from '@framework/utils/get-search-variables'

import sortBy from '@framework/utils/get-sort-variables'
import { normalizeProduct } from '@framework/lib/normalize'

export type SearchProductsInput = {
  search?: string
  categoryPath?: string
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
> = (options, { search, categoryPath, sort }, fetch) => {
  return fetch({
    query: options?.query,
    method: options?.method,
    variables: {
      ...searchByProductType(search),
      ...searchByTag(categoryPath),
      ...sortBy(sort),
    },
  }).then(
    ({ products }): SearchProductsData => {
      return {
        products: products?.edges?.map(({ node: p }: ProductEdge) =>
          normalizeProduct(p)
        ),
        found: !!products?.edges?.length,
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
        method: 'POST',
      },
      [
        ['search', input.search],
        ['categoryPath', input.categoryPath],
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
