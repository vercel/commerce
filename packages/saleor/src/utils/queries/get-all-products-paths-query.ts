export const getAllProductsPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 100, $cursor: String, $channel: String = "default-channel") {
    products(first: $first, after: $cursor, channel: $channel) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          slug
        }
        cursor
      }
    }
  }
`
