export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts(
    $first: Int = 10
    $imgSmallWidth: Int = 320
    $imgSmallHeight: Int
    $imgMediumWidth: Int = 640
    $imgMediumHeight: Int
    $imgLargeWidth: Int = 960
    $imgLargeHeight: Int
    $imgXLWidth: Int = 1280
    $imgXLHeight: Int
  ) {
    site {
      products(first: $first) {
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
                  urlSmall: url(width: $imgSmallWidth, height: $imgSmallHeight)
                  urlMedium: url(
                    width: $imgMediumWidth
                    height: $imgMediumHeight
                  )
                  urlLarge: url(width: $imgLargeWidth, height: $imgLargeHeight)
                  urlXL: url(width: $imgXLWidth, height: $imgXLHeight)
                }
              }
            }
            variants {
              edges {
                node {
                  entityId
                  defaultImage {
                    urlSmall: url(
                      width: $imgSmallWidth
                      height: $imgSmallHeight
                    )
                    urlMedium: url(
                      width: $imgMediumWidth
                      height: $imgMediumHeight
                    )
                    urlLarge: url(
                      width: $imgLargeWidth
                      height: $imgLargeHeight
                    )
                    urlXL: url(width: $imgXLWidth, height: $imgXLHeight)
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
`;
