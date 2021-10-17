import { SWRHook } from '@commerce/utils/types'
import useSearch, { UseSearch } from '@commerce/product/use-search'
import { SearchProductsBody, SearchProductsHook } from '@commerce/types/product'
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

    const { data, meta } = await fetch({
      query: options.query,
      method: options.method,
      variables: getSearchVariables(input),
    })

    const formattedProducts = data?.map(normalizeProduct) || []

    // TODO - manually sort products here?

    return {
      products: formattedProducts,
      found: meta.pagination.total,
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
