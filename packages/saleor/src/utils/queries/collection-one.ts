import * as fragment from '../fragments'

export const CollectionOne = /* GraphQL */ `
  query getProductsFromCollection(
    $categoryId: ID!
    $first: Int = 50
    $channel: String = "default-channel"
  ) {
    collection(id: $categoryId, channel: $channel) {
      id
      products(first: $first) {
        ...ProductConnection
      }
    }
  }
  ${fragment.ProductConnection}
`
