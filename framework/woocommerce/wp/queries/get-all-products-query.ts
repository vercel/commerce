const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($first: Int = 250) {
    products(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          name
          image {
            uri
            altText
          }
        }
      }
    }
  }
`

export default getAllProductsQuery
