import { productDetails } from '../fragments/productDetails'
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
            ...productDetails
          }
          quantity
        }
      }
    }
${productDetails}
`
