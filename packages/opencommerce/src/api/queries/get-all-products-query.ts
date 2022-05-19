const catalogItemsQuery = /* GraphQL */ `
  query catalogItems(
    $first: ConnectionLimitInt = 250
    $sortBy: CatalogItemSortByField = updatedAt
    $sortOrder: SortOrder = desc
    $sortByPriceCurrencyCode: String
    $tagIds: [ID]
    $shopIds: [ID]!
    $searchQuery: String
  ) {
    catalogItems(
      first: $first
      sortBy: $sortBy
      sortOrder: $sortOrder
      tagIds: $tagIds
      shopIds: $shopIds
      searchQuery: $searchQuery
      sortByPriceCurrencyCode: $sortByPriceCurrencyCode
    ) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          _id
          ... on CatalogItemProduct {
            product {
              _id
              title
              slug
              description
              vendor
              isLowQuantity
              isSoldOut
              isBackorder
              shop {
                currency {
                  code
                }
              }
              pricing {
                currency {
                  code
                }
                displayPrice
                minPrice
                maxPrice
              }
              media {
                URLs {
                  thumbnail
                  small
                  medium
                  large
                  original
                }
              }
            }
          }
        }
      }
    }
  }
`
export default catalogItemsQuery
