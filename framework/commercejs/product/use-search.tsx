import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import { SearchProductsBody, SearchProductsHook } from '@commerce/types/product'
import type { Product as CommercejsProduct } from '@chec/commerce.js/types/product'
import { normalizeProduct } from '../utils/normalize-product'

export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    const getSearchVariables = (input: SearchProductsBody) => {
      const { search, categoryId } = input
      let variables: { [key: string]: any } = {}
      if (search) {
        variables.query = search
      }
      if (categoryId) {
        variables['category_id'] = categoryId
      }
      return variables
    }

    const { data, meta } = await fetch<{
      data: CommercejsProduct[]
      meta: {
        pagination: {
          total: number
        }
      }
    }>({
      query: options.query,
      method: options.method,
      variables: getSearchVariables(input),
    })

    // Manually sort the products because the Commerce.js SDK doesn't support this yet.
    let sortedProducts = data
    switch (input.sort) {
      case 'trending-desc':
        sortedProducts = data.sort((a, b) => b.updated - a.updated)
        break
      case 'latest-desc':
        sortedProducts = data.sort((a, b) => b.updated - a.updated)
        break
      case 'price-asc':
        sortedProducts = data.sort((a, b) => a.price.raw - b.price.raw)
        break
      case 'price-desc':
        sortedProducts = data.sort((a, b) => b.price.raw - a.price.raw)
        break
    }

    const formattedProducts = sortedProducts?.map(normalizeProduct) || []

    return {
      products: formattedProducts,
      found: meta.pagination.total > 0,
    }
  },
  useHook:
    ({ useData }) =>
    (input = {}) => {
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
