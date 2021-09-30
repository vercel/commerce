import { GetProductQuery } from '@framework/schema'
import { getProductDetailQuery } from '@framework/utils/queries/get-product-query';
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'


interface ProductDetail {
  slug: string
}

const useProductDetail = () => {
  const { data, ...rest } = useSWR<GetProductQuery>([getProductDetailQuery],gglFetcher)
  return { productDetail: data?.product, ...rest }
}

export default useProductDetail