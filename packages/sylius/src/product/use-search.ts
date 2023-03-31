import { SWRHook } from '@vercel/commerce/utils/types'
import useSearch, { UseSearch } from '@vercel/commerce/product/use-search'
import { normalizeProduct } from '../utils/normalize/normalize-product'
import { SyliusProduct } from 'types/products'
import { API_URL } from './../const'
import { SearchProductsHook } from '@vercel/commerce/types/product'
import { PRODUCTS_ENDPOINT } from '../utils/constant/api-endpoints'
export default useSearch as UseSearch<typeof handler>

export type SearchProductsInput = {
  search?: string
  categoryId?: number | string
  brandId?: number
  sort?: string
  locale?: string
}

export const handler: SWRHook<SearchProductsHook> = {
  fetchOptions: {
    url: PRODUCTS_ENDPOINT,
    method: 'GET',
  },
  fetcher: async ({ input: { search, categoryId, sort }, options, fetch }) => {
    const url = new URL(options.url!, API_URL)

    if (categoryId)
      url.searchParams.set('productTaxons.taxon.code', categoryId as string)
    if (search) url.searchParams.set('translations.name', search)
    if (sort) {
      switch (sort) {
        case 'latest-desc':
          url.searchParams.set('order[createdAt]', 'desc')
          break
        case 'price-desc':
          url.searchParams.set('order[price]', 'desc')
          break
        case 'price-asc':
          url.searchParams.set('order[price]', 'asc')
          break
        default:
          break
      }
    }
    const syliusProducts = await fetch({
      url: url.pathname + url.search,
      method: 'GET',
    })
    const products = syliusProducts.map((syliusProduct: SyliusProduct) =>
      normalizeProduct(syliusProduct)
    )
    return { products: products, found: products.length }
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
