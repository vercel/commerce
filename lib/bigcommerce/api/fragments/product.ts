export const responsiveImageFragment = /* GraphQL */ `
  fragment responsiveImage on Image {
    urlSmall: url(width: $imgSmallWidth, height: $imgSmallHeight)
    urlMedium: url(width: $imgMediumWidth, height: $imgMediumHeight)
    urlLarge: url(width: $imgLargeWidth, height: $imgLargeHeight)
    urlXL: url(width: $imgXLWidth, height: $imgXLHeight)
    urlOriginal
    altText
    isDefault
  }
`

export const productInfoFragment = /* GraphQL */ `
  fragment productInfo on Product {
    entityId
    name
    path
    brand {
      name
      entityId
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

  ${responsiveImageFragment}
`
