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
    // Use a dummy base as we only care about the relative path
    const url = new URL(options.url!, 'http://a')

    if (search) url.searchParams.set('search', String(search))
    if (categoryId) url.searchParams.set('categoryId', String(categoryId))
    if (brandId) url.searchParams.set('brandId', String(brandId))
    if (sort) url.searchParams.set('sort', String(sort))

    return fetch({
      url: url.pathname + url.search,
      method: options.method,
    })
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
