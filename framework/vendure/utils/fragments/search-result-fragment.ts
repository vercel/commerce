export const searchResultFragment = /* GraphQL */ `
  fragment SearchResult on SearchResult {
    productId
    productName
    description
    description
    slug
    sku
    currencyCode
    productVariantId
    productAsset {
      id
      preview
    }
    priceWithTax {
      ... on SinglePrice {
        value
      }
      ... on PriceRange {
        min
        max
      }
    }
  }
`
