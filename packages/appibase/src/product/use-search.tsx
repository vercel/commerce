import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
export default useSearch as UseSearch<typeof handler>
import type { AppibaseProduct } from '../types'
import { NormalizeProduct } from '../api/utils/normalize'

export type SearchProductsInput = {
  search?: string
  categoryId?: number | string
  brandId?: number
  sort?: string
  locale?: string
}

export const handler: SWRHook<any> = {
  fetchOptions: {
    url: '/products?filter[is_parent_true]=true&include=prices',
    method: 'GET',
  },
  async fetcher({ input: { search, categoryId, brandId, sort }, options, fetch }) {
    let url = options.url

    if (search) url += `&filter[name_cont_all]=${search}`
    if (Number.isInteger(Number(categoryId)))
      url += `&filter[collections_id_eq]=${categoryId}`
    // if (Number.isInteger(brandId))
    //   url.searchParams.set('brandId', String(brandId))
    // if (sort) url.searchParams.set('sort', sort)

    
    const response = await fetch({
      query: url,
      method: options.method,
    })

    return { found: response.data.length, products: response.data.map((p : AppibaseProduct) => NormalizeProduct(p) ) }
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
