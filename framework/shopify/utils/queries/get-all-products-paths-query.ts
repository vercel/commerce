const getAllProductsPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int!) {
    products(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          handle
        }
      }
    }
  }
`
export default getAllProductsPathsQuery
