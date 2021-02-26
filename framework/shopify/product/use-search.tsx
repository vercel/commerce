import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'

import { ProductEdge } from '../schema'
import {
  getAllProductsQuery,
  getCollectionProductsQuery,
  getSearchVariables,
  normalizeProduct,
} from '../utils'

import { Product } from '@commerce/types'

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
    query: getAllProductsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const { categoryId, brandId } = input

    const data = await fetch({
      query: categoryId ? getCollectionProductsQuery : options.query,
      method: options?.method,
      variables: getSearchVariables(input),
    })

    let edges

    if (categoryId) {
      edges = data.node?.products?.edges ?? []
      if (brandId) {
        edges = edges.filter(
          ({ node: { vendor } }: ProductEdge) => vendor === brandId
        )
      }
    } else {
      edges = data.products?.edges ?? []
    }

    return {
      products: edges.map(({ node }: ProductEdge) => normalizeProduct(node)),
      found: !!edges.length,
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
