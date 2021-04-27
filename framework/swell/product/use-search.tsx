import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'

import { normalizeProduct } from '../utils'

import { Product } from '@commerce/types'

import { SwellProduct } from '../types'

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
    query: 'products', // String(Math.random()),
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    const sortMap = new Map([
      ['latest-desc', ''],
      ['price-asc', 'price_asc'],
      ['price-desc', 'price_desc'],
      ['trending-desc', 'popularity'],
    ])
    const { categoryId, search, sort = 'latest-desc' } = input
    const mappedSort = sortMap.get(sort)
    const { results, count: found } = await fetch({
      query: 'products',
      method: 'list',
      variables: { category: categoryId, search, sort: mappedSort },
    })

    const products = results.map((product: SwellProduct) =>
      normalizeProduct(product)
    )

    return {
      products,
      found,
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
