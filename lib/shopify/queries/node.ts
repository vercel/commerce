export const getImageQuery = /* GraphQL */ `
  query getImage($id: ID!) {
    node(id: $id) {
      ... on MediaImage {
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
`;

export const getMetaobjectsByIdsQuery = /* GraphQL */ `
  query getMetaobjectsByIds($ids: [ID!]!) {
    nodes(ids: $ids) {
      ... on Metaobject {
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
`;
