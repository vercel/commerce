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
    $filter: ProductFilterInput
    $channel: String = "default-channel"
  ) {
    products(first: $first, channel: $channel, filter: $filter) {
      ...productConnnection
    }
  }
  ${productConnection}
`
export default getAllProductsQuery
