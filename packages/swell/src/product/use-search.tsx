import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { normalizeProduct } from '../utils'
import { getSubCategories } from '../utils/get-sub-categories'
import { SwellProduct } from '../types'
import type { SearchProductsHook } from '../types/product'
import { SwellCategory } from '../types/site'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: string
  brandId?: string
  sort?: string
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    const sortMap = new Map([
      ['latest-desc', ''],
      ['price-asc', 'price asc'],
      ['price-desc', 'price desc'],
      ['trending-desc', 'popularity'],
    ])
    const { brandId, categoryId, search, sort = 'latest-desc' } = input
    const mappedSort = sortMap.get(sort)

    let subCategories: SwellCategory[] = [];
    if (categoryId) {
      const { results: categories } = await fetch({
        query: 'categories',
        method: 'list',
        variables: {
          expand: 'children',
          limit: 100 //maximum allowed
        }
      })

      subCategories = getSubCategories(categoryId.toString(), categories)
    }
    const { results, count: found } = await fetch({
      ...options,
      variables: { 
        search, 
        sort: mappedSort,
        $filters: {
          brand: brandId,
          category: subCategories.map((c) => c.id)
        }
      }
    })

    const products = results.map((product: SwellProduct) =>
      normalizeProduct(product)
    )

    return {
      products,
      found,
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
