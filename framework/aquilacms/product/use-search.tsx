import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import type { SearchProductsData } from '../api/catalog/products'

export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: number
  brandId?: number
  sort?: string
}

export const handler: SWRHook<
  SearchProductsData,
  SearchProductsInput,
  SearchProductsInput
> = {
  fetchOptions: {
    url: '/api/bigcommerce/catalog/products',
    method: 'GET',
  },
  fetcher({ input: { search, categoryId, brandId, sort }, options, fetch }) {
    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (search) url.searchParams.set('search', search)
    if (Number.isInteger(categoryId))
      url.searchParams.set('category', String(categoryId))
    if (Number.isInteger(brandId))
      url.searchParams.set('brand', String(brandId))
    if (sort) url.searchParams.set('sort', sort)

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
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
