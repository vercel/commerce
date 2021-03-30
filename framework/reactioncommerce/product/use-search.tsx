import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'

import { CatalogItemEdge } from '../schema'
import {
  catalogItemsQuery,
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
  shopId?: string
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
    query: catalogItemsQuery,
  },
  async fetcher({ input, options, fetch }) {
    const { brandId, shopId } = input

    const data = await fetch({
      query: options.query,
      method: options?.method,
      variables: {
        ...getSearchVariables(input),
        shopIds: [shopId],
      },
    })

    let edges

    edges = data.catalogItems?.edges ?? []
    if (brandId) {
      edges = edges.filter(
        ({ node: { vendor } }: CatalogItemEdge) => vendor === brandId
      )
    }

    return {
      products: edges.map(({ node }: CatalogItemEdge) =>
        normalizeProduct(node)
      ),
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
        ['shopId', input.shopId],
      ],
      swrOptions: {
        revalidateOnFocus: false,
        ...input.swrOptions,
      },
    })
  },
}
