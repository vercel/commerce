import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import { Product } from '@commerce/types'
import { SearchQuery, SearchQueryVariables } from '../schema'
import { normalizeSearchResult } from '../lib/normalize'
import { searchQuery } from '../lib/queries/search-query'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
}

export type SearchProductsData = {
  products: Product[]
  found: boolean
}

export const handler: SWRHook<
  SearchProductsData,
  SearchProductsInput,
  SearchProductsInput
> = {
  fetchOptions: {
    query: searchQuery,
  },
  async fetcher({ input, options, fetch }) {
    const { categoryId, brandId } = input

    const variables: SearchQueryVariables = {
      input: {
        term: input.search,
        collectionId: input.categoryId,
        groupByProduct: true,
        // TODO: what is the "sort" value?
      },
    }
    const { search } = await fetch<SearchQuery>({
      query: searchQuery,
      variables,
    })

    return {
      found: search.totalItems > 0,
      products: search.items.map((item) => normalizeSearchResult(item)) ?? [],
    }
  },
  useHook: ({ useData }) => (input = {}) => {
    return useData({
      input: [
        ['search', input.search],
        ['categoryId', input.categoryId],
        ['brandId', input.brandId],
        ['sort', input.sort],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}
