import { GetProductQuery } from '@framework/schema'
import { gql } from 'graphql-request'
import gglFetcher from 'src/utils/gglFetcher'
import useSWR from 'swr'

const query = gql`
  query GetProductDetail($slug: String! = "hand-trowel") {
  product(slug: $slug) {
    name
    description
    variants {
      price
      priceWithTax
    }
    assets {
      preview
      name
    }
  }
}
`
interface ProductDetail {
  slug: string
}

const useProductDetail = () => {
  const { data, ...rest } = useSWR<GetProductQuery>([query],gglFetcher)
  return { productDetail: data?.product, ...rest }
}

export default useProductDetail