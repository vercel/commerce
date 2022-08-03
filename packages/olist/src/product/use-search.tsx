import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { SearchProductsHook } from '@vercel/commerce/types/product'
export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    url: '/api/catalog/products',
    method: 'GET',
  },
  fetcher({ input: { search, categoryId, brandId, sort }, options, fetch }) {
    const url = new URLSearchParams()

    if (search) url.set('search', String(search))
    if (categoryId) url.set('categoryId', String(categoryId))
    if (brandId) url.set('brandId', String(brandId))
    if (sort) url.set('sort', String(sort))

    return fetch({
      url: `${options.url!}?${url}`,
      method: options.method,
    })
  },
  useHook: ({ useData }) =>
    function useHook(input = {}) {
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
