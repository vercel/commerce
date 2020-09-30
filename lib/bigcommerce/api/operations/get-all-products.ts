export const responsiveImageFragment = /* GraphQL */ `
  fragment responsiveImage on Image {
    url320wide: url(width: 320)
    url640wide: url(width: 640)
    url960wide: url(width: 960)
    url1280wide: url(width: 1280)
  }
`;

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts {
    site {
      products(first: 4) {
        pageInfo {
          startCursor
          endCursor
        }
        edges {
          cursor
          node {
            entityId
            name
            path
            brand {
              name
            }
            description
            prices {
              price {
                value
                currencyCode
              }
              salePrice {
                value
                currencyCode
              }
            }
            images {
              edges {
                node {
                  ...responsiveImage
                }
              }
            }
            variants {
              edges {
                node {
                  entityId
                  defaultImage {
                    ...responsiveImage
                  }
                }
              }
            }
            options {
              edges {
                node {
                  entityId
                  displayName
                  isRequired
                  values {
                    edges {
                      node {
                        entityId
                        label
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  ${responsiveImageFragment}
`;
