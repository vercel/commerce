export const cartFragment = /* GraphQL */ `
  fragment Cart on Order {
    id
    code
    createdAt
    totalQuantity
    subTotal
    subTotalWithTax
    total
    totalWithTax
    currencyCode
    state
    customer {
      id
    }
    lines {
      id
      quantity
      linePriceWithTax
      discountedLinePriceWithTax
      unitPriceWithTax
      discountedUnitPriceWithTax
      featuredAsset {
        id
        preview
      }
      discounts {
        description
        amount
        amountWithTax
      }
      productVariant {
        id
        name
        sku
        price
        priceWithTax
        stockLevel
        product {
          slug
        }
        productId
      }
    }
  }
`
