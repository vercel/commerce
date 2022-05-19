const getAllProductsPathsQuery = `
  query catalogItems(
    $first: ConnectionLimitInt = 250
    $sortBy: CatalogItemSortByField = updatedAt
    $shopIds: [ID]!
  ) {
    catalogItems(first: $first, sortBy: $sortBy, shopIds: $shopIds) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          ... on CatalogItemProduct {
            product {
              slug
            }
          }
        }
        cursor
      }
    }
  }
`
export default getAllProductsPathsQuery
