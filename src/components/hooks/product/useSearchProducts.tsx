import { GetAllProductsQuery, QuerySearchArgs } from '@framework/schema'
import { normalizeSearchResult } from '@framework/utils/normalize'
import { getAllProductsQuery } from '@framework/utils/queries/get-all-products-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useSearchProducts = (options?: QuerySearchArgs) => {
  const { data, isValidating, ...rest } = useSWR<GetAllProductsQuery>([getAllProductsQuery, options], gglFetcher)

  return { products: data?.search.items.map((item) => normalizeSearchResult(item)), totalItems: data?.search.totalItems, loading: isValidating, ...rest }
}

export default useSearchProducts
