export const getMetaobjectReferencesQuery = /* GraphQL */ `
  query getMetaobjectReferences($id: ID!, $after: String) {
    metaobject(id: $id) {
      id
      referencedBy(first: 20, after: $after) {
        edges {
          node {
            key
            referencer {
              ... on Metaobject {
                id
                type
                fields {
                  key
                  value
                }
              }
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
          hasPreviousPage
          startCursor
        }
      }
    }
  }
`;
