export const searchResultFragment = /* GraphQL */ `
  fragment SearchResult on SearchResult {
    productId
    productName
    description
    slug
    sku
    currencyCode
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
