import type { HookFetcher } from '@commerce/utils/types'
import type { SwrOptions } from '@commerce/utils/use-data'
import useCommerceSearch from '@commerce/products/use-search'
import useResponse from '@commerce/utils/use-response'
import { searchResultFragment } from '@framework/api/fragments/search-result'
import { SearchQuery } from '@framework/schema'
import { normalizeSearchResult } from '@framework/lib/normalize'

export const searchQuery = /* GraphQL */ `
  query search($input: SearchInput!) {
    search(input: $input) {
      items {
        ...SearchResult
      }
      totalItems
    }
  }
  ${searchResultFragment}
`

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export const fetcher: HookFetcher<SearchQuery, SearchProductsInput> = (
  options,
  { search, categoryId, brandId, sort },
  fetch
) => {
  return fetch({
    query: searchQuery,
    variables: {
      input: {
        term: search,
        collectionId: categoryId,
        groupByProduct: true,
      },
    },
  })
}

export function extendHook(
  customFetcher: typeof fetcher,
  swrOptions?: SwrOptions<any, SearchProductsInput>
) {
  const useSearch = (input: SearchProductsInput = {}) => {
    const response = useCommerceSearch<SearchQuery, SearchProductsInput>(
      {},
      [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort],
      ],
      customFetcher,
      { revalidateOnFocus: false, ...swrOptions }
    )

    return useResponse(response, {
      normalizer: (data) => {
        return {
          found: data?.search.totalItems && data?.search.totalItems > 0,
          products:
            data?.search.items.map((item) => normalizeSearchResult(item)) ?? [],
        }
      },
    })
  }

  useSearch.extend = extendHook

  return useSearch
}

export default extendHook(fetcher)
