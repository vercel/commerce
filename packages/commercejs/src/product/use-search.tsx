import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { SearchProductsHook } from '@vercel/commerce/types/product'
import type { CommercejsProduct } from '../types'
import { getProductSearchVariables } from '../utils/product-search'
import { normalizeProduct } from '../utils/normalize-product'

export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
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
      variables: getProductSearchVariables(input),
    })

    const formattedProducts =
      data?.map((product) => normalizeProduct(product)) || []

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
