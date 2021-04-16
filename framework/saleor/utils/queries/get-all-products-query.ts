export const productConnection = /* GraphQL */ `
  fragment productConnnection on ProductCountableConnection {
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

const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 100
    $channel: String = "default-channel"
  ) {
    products(first: $first, channel: $channel) {
      ...productConnnection
    }
  }
  ${productConnection}
`
export default getAllProductsQuery
