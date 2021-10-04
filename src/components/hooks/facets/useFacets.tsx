import { GetAllFacetsQuery, QueryFacetsArgs } from '@framework/schema'
import { getAllFacetsQuery } from '@framework/utils/queries/get-all-facets-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useFacets = (options?: QueryFacetsArgs) => {
  const { data, isValidating, ...rest } = useSWR<GetAllFacetsQuery>([getAllFacetsQuery, options], gglFetcher)
  return { items: data?.facets.items, totalItems: data?.facets.totalItems, loading: isValidating, ...rest }
}

export default useFacets
