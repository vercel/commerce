import useSearch, { UseSearch } from '@commerce/products/use-search'
import { SearchProductsData } from '@commerce/types'
import { HookHandler } from '@commerce/utils/types'
import { ProductEdge } from '@framework/schema'
import {
  getAllProductsQuery,
  getSearchVariables,
  normalizeProduct,
} from '@framework/utils'
import type { ShopifyProvider } from '..'

export default useSearch as UseSearch<ShopifyProvider>

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export const handler: HookHandler<
  SearchProductsData,
  SearchProductsInput,
  SearchProductsInput
> = {
  fetchOptions: {
    query: getAllProductsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const resp = await fetch({
      query: options?.query,
      method: options?.method,
      variables: getSearchVariables(input),
    })
    const edges = resp.products?.edges
    return {
      products: edges?.map(({ node: p }: ProductEdge) => normalizeProduct(p)),
      found: !!edges?.length,
    }
  },
  useHook({ input, useData }) {
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
