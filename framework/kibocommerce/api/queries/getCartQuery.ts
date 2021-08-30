export const getCartQuery = /* GraphQL */`
query cart {
    currentCart {
      id
      userId
      orderDiscounts {
        impact
        discount {
          id
          name        
        }
        couponCode
      }
      subtotal
      shippingTotal
      total
      items {
        id
        subtotal
        unitPrice{
          extendedAmount
        }
          product {
            productCode
            variationProductCode
            name
            description
            imageUrl
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
            sku
            price {
              price
              salePrice
            }
            categories {
              id
            }
          }
          quantity
        }
      }
    }
`
