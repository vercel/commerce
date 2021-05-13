export const productConnection = /* GraphQL */ `
  fragment productConnection on ProductCountableConnection {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        name
        description
        slug
        pricing {
          priceRange {
            start {
              net {
                amount
              }
            }
          }
        }
        media {
          url
          alt
        }
      }
    }
  }
`

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 100
    $filter: ProductFilterInput
    $sortBy: ProductOrder
    $channel: String = "default-channel"
  ) {
    products(first: $first, channel: $channel, filter: $filter, sortBy: $sortBy) {
      ...productConnection
    }
  }
  ${productConnection}
`
