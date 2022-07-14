export const productCardFragment = /* GraphQL */ `
  fragment productCard on Product {
    id
    handle
    availableForSale
    title
    productType
    vendor
    variants(first: 1) {
      nodes {
        id
        title
        requiresShipping
        availableForSale
        selectedOptions {
          name
          value
        }
        image {
          url
          altText
          width
          height
        }
        priceV2 {
          amount
          currencyCode
        }
        compareAtPriceV2 {
          amount
          currencyCode
        }
      }
    }
  }
`
