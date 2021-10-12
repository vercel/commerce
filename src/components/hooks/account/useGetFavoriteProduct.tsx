import { ActiveCustomerQuery,QueryFavorite,Favorite } from '@framework/schema'
import { getFavoriteProductQuery } from '@framework/utils/queries/get-favorite-product-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useGetFavoriteProduct = (options:QueryFavorite) => {
  const { data, ...rest } = useSWR<ActiveCustomerQuery>([getFavoriteProductQuery, options], gglFetcher)
  console.log(options);
  return {
      itemWishlist:
        data?.activeCustomer?.favorites?.items?.map((val:Favorite)=>({
          id: val.product?.id,
          name:val.product?.name,
          slug:val.product?.slug,
          price:val.product?.variants?.[0].price,
          imageSrc: val.product?.assets?.[0].preview,
          currencyCode: val.product?.variants?.[0].currencyCode
        })
      ),
      totalItems: data?.activeCustomer?.favorites?.totalItems,
      ...rest 
  }
}

export default useGetFavoriteProduct
