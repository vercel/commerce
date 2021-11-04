import { QueryRecommendedProductsInCartArgs, RecommendedProductsInCartQuery } from '@framework/schema'
import { normalizeProducts } from '@framework/utils/normalize'
import { recommendedProductsInCartQuery } from '@framework/utils/queries/recommended-products-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useRecommendedProductsInCart = (option: QueryRecommendedProductsInCartArgs) => {
  const { data, ...rest } = useSWR<RecommendedProductsInCartQuery>([recommendedProductsInCartQuery, option], gglFetcher)
  
  return { products: data?.recommendedProductsInCart?.items ? normalizeProducts(data.recommendedProductsInCart.items) : [], ...rest }
}

export default useRecommendedProductsInCart
