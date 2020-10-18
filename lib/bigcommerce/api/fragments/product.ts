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

export const swatchOptionFragment = /* GraphQL */ `
  fragment swatchOption on SwatchOptionValue {
    isDefault
    hexColors
  }
`

export const multipleChoiceOptionFragment = /* GraphQL */ `
  fragment multipleChoiceOption on MultipleChoiceOption {
    entityId
    values {
      edges {
        node {
          label
          ...swatchOption
        }
      }
    }
  }

  ${swatchOptionFragment}
`

export const productInfoFragment = /* GraphQL */ `
  fragment productInfo on Product {
    entityId
    name
    path
    brand {
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
    productOptions {
      edges {
        node {
          entityId
          displayName
          ...multipleChoiceOption
        }
      }
    }
  }

  ${responsiveImageFragment}
  ${multipleChoiceOptionFragment}
`

export const productConnectionFragment = /* GraphQL */ `
  fragment productConnnection on ProductConnection {
    pageInfo {
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        ...productInfo
      }
    }
  }

  ${productInfoFragment}
`
