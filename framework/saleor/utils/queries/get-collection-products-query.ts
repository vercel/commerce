import { productConnection } from './get-all-products-query'

export const getCollectionProductsQuery = /* GraphQL */ `
  query getProductsFromCollection(
    $categoryId: ID!
    $first: Int = 100
    $channel: String = "default-channel"
  ) {
    collection(id: $categoryId, channel: $channel) {
      id
      products(first: $first) {
        ...productConnection
      }
    }
  }
  ${productConnection}
`
