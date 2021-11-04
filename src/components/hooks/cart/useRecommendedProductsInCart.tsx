import { RecommendedProductsInCartQuery } from '@framework/schema'
import { normalizeProducts } from '@framework/utils/normalize'
import { recommendedProductsInCartQuery } from '@framework/utils/queries/recommended-products-query'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const useRecommendedProductsInCart = () => {
  const { data, ...rest } = useSWR<RecommendedProductsInCartQuery>([recommendedProductsInCartQuery], gglFetcher)
  
  return { products: data?.recommendedProductsInCart?.items ? normalizeProducts(data.recommendedProductsInCart.items) : [], ...rest }
}

export default useRecommendedProductsInCart
