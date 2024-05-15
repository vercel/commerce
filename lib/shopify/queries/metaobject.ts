export const getMetaobjectsQuery = /* GraphQL */ `
  query getMetaobjects($type: String!) {
    metaobjects(type: $type, first: 200) {
      edges {
        node {
          id
          fields {
            reference {
              ... on Metaobject {
                id
              }
            }
            key
            value
          }
        }
      }
    }
  }
`;
