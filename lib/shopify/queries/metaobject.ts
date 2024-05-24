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

export const getMetaobjectQuery = /* GraphQL */ `
  query getMetaobject($id: ID!) {
    metaobject(id: $id) {
      id
      type
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
`;
