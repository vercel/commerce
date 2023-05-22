export const getMenuQuery = /* GraphQL */ `
  query getMenu {
    site {
      categoryTree {
        ...CategoryFields
        children {
          ...CategoryFields
          children {
            ...CategoryFields
          }
        }
      }
    }
  }
  fragment CategoryFields on CategoryTreeItem {
    hasChildren
    entityId
    name
    path
  }
`;
