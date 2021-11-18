export const getActiveOrderForCheckoutQuery = /* GraphQL */ `
query getActiveOrderForCheckout {
  activeOrder {
    ...Cart
    shippingAddress {
      ...OrderAddress
      __typename
    }
    __typename
  }
}

fragment Cart on Order {
  id
  code
  state
  active
  customer {
    id
    firstName
    lastName
    emailAddress
  }
  lines {
    id
    featuredAsset {
      ...Asset
      __typename
    }
    unitPrice
    unitPriceWithTax
    quantity
    linePriceWithTax
    discountedLinePriceWithTax
    unitPriceWithTax
    discountedUnitPriceWithTax
    productVariant {
      id
      name
      price
      priceWithTax
      stockLevel
      productId
      product {
          slug
        }
      __typename
    }
    discounts {
      amount
      amountWithTax
      description
      adjustmentSource
      type
      __typename
    }
    __typename
  }
  totalQuantity
  subTotal
  subTotalWithTax
  total
  totalWithTax
  shipping
  shippingWithTax
  currencyCode
  couponCodes
  shippingLines {
    priceWithTax
    shippingMethod {
      id
      code
      name
      description
      __typename
    }
    __typename
  }
  discounts {
    amount
    amountWithTax
    description
    adjustmentSource
    type
    __typename
  }
  __typename
}

fragment Asset on Asset {
  id
  width
  height
  name
  preview
  focalPoint {
    x
    y
    __typename
  }
  __typename
}

fragment OrderAddress on OrderAddress {
  fullName
  company
  streetLine1
  streetLine2
  city
  province
  postalCode
  countryCode
  phoneNumber
  __typename
}
`

