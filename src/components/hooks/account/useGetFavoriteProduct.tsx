import { ActiveCustomerQuery,QueryFavorite,Favorite } from '@framework/schema'
import { normalizeFavoriteProductResult } from '@framework/utils/normalize'
import { getFavoriteProductQuery } from '@framework/utils/queries/get-favorite-product-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetFavoriteProduct = (options?:QueryFavorite) => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([getFavoriteProductQuery, options], gglFetcher)
  return {
      itemWishlist: data?.activeCustomer?.favorites?.items?.map((item:Favorite) => normalizeFavoriteProductResult(item)), 
      totalItems: data?.activeCustomer?.favorites?.totalItems,
      ...rest 
  }
}

export default useGetFavoriteProduct
