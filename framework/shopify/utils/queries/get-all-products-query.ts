const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 250
    $query: String = ""
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    products(
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          title
          vendor
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1) {
            pageInfo {
              hasNextPage
              hasPreviousPage
            }
            edges {
              node {
                originalSrc
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }
`
export default getAllProductsQuery
