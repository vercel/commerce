export const productConnectionFragment = /* GraphQL */ `
  fragment productConnection on ProductConnection {
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

const getAllProductsQuery = /* GraphQL */ `
products(first: $first) {
  pageInfo {
    hasNextPage
    hasPreviousPage
  }
  edges {
    node {
      id
      name
      ...productConnection
    }
  }
}

  ${productConnectionFragment}
`
export default getAllProductsQuery
