import { productInfo } from '../fragments/product';

export const getAllProductsQuery = /* GraphQL */`
${productInfo}

query products(
  $filter: String
  $startIndex: Int
  $pageSize: Int
) {
  products(
    filter: $filter
    startIndex: $startIndex
    pageSize: $pageSize
  ) {
    items {
      ...productInfo
    }
  }
}
`