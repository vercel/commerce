export const productDetails = /* GraphQL */ `
  fragment productDetails on CrProduct {
    productCode
    name
    description
    imageUrl
    imageAlternateText
    sku
    variationProductCode
    price {
      price
      salePrice
    }
    options {
      attributeFQN
      name
      value
    }
    properties {
      attributeFQN
      name
      values {
        value
      }
    }
    categories {
      id
    } 
}
`
