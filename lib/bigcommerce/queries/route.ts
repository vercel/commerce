export const getEntityIdByRouteQuery = /* GraphQL */ `
  query getEntityIdByRoute($path: String!) {
    site {
      route(path: $path) {
        node {
          __typename
          ... on Product {
            entityId
          }
          ... on Category {
            entityId
          }
          ... on Brand {
            entityId
          }
        }
      }
    }
  }
`;
