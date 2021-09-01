import { productInfo } from '../fragments/product';

export const getAllProductsQuery = /* GraphQL */`
${productInfo}

query products(
  $filter: String
  $pageSize: Int
) {
  products(
    filter: $filter
    pageSize: $pageSize
  ) {
    items {
      ...productInfo
    }
  }
}
`