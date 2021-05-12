import { productConnection } from './get-all-products-query'

export const getCollectionProductsQuery = /* GraphQL */ `
  query getProductsFromCollection(
    $categoryId: ID!
    $first: Int = 250
    $sortKey: ProductCollectionSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    node(id: $categoryId) {
      id
      ... on Collection {
        products(
          first: $first
          sortKey: $sortKey
          reverse: $reverse
        ) {
          ${productConnection}
        }
      }
    }
  }
`
