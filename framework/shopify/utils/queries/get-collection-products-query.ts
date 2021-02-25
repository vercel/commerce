import { productsFragment } from './get-all-products-query'

const getCollectionProductsQuery = /* GraphQL */ `
  query getProductsFromCollection(
    $categoryHandle: String!
    $first: Int = 250
    $query: String = ""
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    collectionByHandle(handle: $categoryHandle)
    {
        ${productsFragment}
    }
  }
`
export default getCollectionProductsQuery
