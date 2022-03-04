export const getCollectionsQuery = /* GraphQL */ `
  query getCollections {
    collections {
      items {
        id
        name
        description
        slug
        productVariants {
          totalItems
        }
        parent {
          id
        }
        children {
          id
        }
      }
    }
  }
`
