export const catalogItemsConnection = `
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
}`

export const catalogItemsFragment = `
catalogItems(
  first: $first
  sortBy: $sortBy
  tagIds: $tagIds
  shopIds: $shopIds
  searchQuery: $searchQuery
) {
  ${catalogItemsConnection}
}
`

const catalogItemsQuery = /* GraphQL */ `
  query catalogItems(
    $first: ConnectionLimitInt = 250
    $sortBy: CatalogItemSortByField = updatedAt
    $tagIds: [ID]
    $shopIds: [ID]!
    $searchQuery: String
  ) {
    ${catalogItemsFragment}
  }
`
export default catalogItemsQuery
