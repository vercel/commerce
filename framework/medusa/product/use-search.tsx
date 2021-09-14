import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import { Product } from '@commerce/types/product'
import { Product as MedusaProduct } from '@medusajs/medusa-js/lib/types'
import { normalizeProduct } from '@framework/utils/normalizers/normalize-products'
export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    const { products } = await fetch({
      ...options,
      variables: { query: null },
    })

    return {
      products: products
        ? products.map((product: MedusaProduct) => normalizeProduct(product))
        : [],
      found: products.length,
    }
  },
  useHook:
    ({ useData }) =>
    ({ input = {} }) => {
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
