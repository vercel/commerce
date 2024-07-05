export const getMetaobjectsQuery = /* GraphQL */ `
  query getMetaobjects($type: String!, $after: String) {
    metaobjects(type: $type, first: 200, after: $after) {
      edges {
        node {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export const getMetaobjectQuery = /* GraphQL */ `
  query getMetaobject($id: ID, $handle: MetaobjectHandleInput) {
    metaobject(id: $id, handle: $handle) {
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

export const getOrderConfirmationQuery = /* GraphQL */ `
  query getOrderConfirmation($handle: MetaobjectHandleInput) {
    metaobject(handle: $handle) {
      id
      type
      fields {
        reference {
          ... on MediaImage {
            image {
              url
              altText
              height
              width
            }
          }
        }
        key
        value
      }
    }
  }
`;
