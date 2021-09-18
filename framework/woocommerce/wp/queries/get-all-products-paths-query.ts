const getAllProductsPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 250, $cursor: String) {
    products(first: $first, after: $cursor) {
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
export default getAllProductsPathsQuery
