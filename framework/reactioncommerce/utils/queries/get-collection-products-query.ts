import { catalogItemsConnection } from './catalog-items-query'

const getCollectionProductsQuery = /* GraphQL */ `
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
          ${catalogItemsConnection}
        }
      }
    }
  }
`
export default getCollectionProductsQuery
