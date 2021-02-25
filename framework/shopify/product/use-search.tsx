import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'

import { ProductEdge } from '../schema'
import {
  getAllProductsQuery,
  getSearchVariables,
  normalizeProduct,
} from '../utils'

import { Product } from '@commerce/types'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
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
      products: edges?.map(({ node: p }: ProductEdge) =>
        // TODO: Fix this product type
        normalizeProduct(p as any)
      ),
      found: !!edges?.length,
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
