export const cartFragment = /* GraphQL */ `
  fragment Cart on Order {
    id
    code
    totalQuantity
    subTotal
    subTotalWithTax
    total
    totalWithTax
    currencyCode
    customer {
      id
    }
    lines {
      id
      quantity
      featuredAsset {
        id
        preview
      }
      productVariant {
        id
        name
        product {
          slug
        }
        productId
      }
    }
  }
`
