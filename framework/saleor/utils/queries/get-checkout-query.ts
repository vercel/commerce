export const checkoutDetailsFragment = `
  id
  token
  created

  lines {
    id
    variant {
      id
      name
      sku
      product {
        slug
      }
      media {
        url
      }
      pricing {
        price {
          gross {
            amount
          }
        }
        
      }
    }
    quantity
    totalPrice {
      currency
      gross {
        amount
      }
    }
  }
`

const getCheckoutQuery = /* GraphQL */ `
  query($checkoutId: UUID!) {
    checkout(token: $checkoutId) {
      ... on Checkout {
        ${checkoutDetailsFragment}
      }
    }
  }
`
export default getCheckoutQuery
