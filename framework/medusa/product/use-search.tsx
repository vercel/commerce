import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import { MedusaProduct } from '@framework/types'
import { normalizeProduct } from '@framework/utils/normalizers/normalize-products'
export default useSearch as UseSearch<typeof handler>

export const handler: SWRHook<any> = {
  fetchOptions: {
    query: 'products',
    method: 'list',
  },
  async fetcher({ input, options, fetch }) {
    // NOOP
    // const results = await fetch({
    //   ...options,
    //   variables: { query: null },
    // })

    // console.warn(results)

    return {
      products: [],
      found: 0,
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
