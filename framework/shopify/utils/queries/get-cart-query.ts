export const cartDetailsFragment = /* GraphQL */ `
  fragment cartDetails on Cart {
    id
    checkoutUrl
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          merchandise {
            ... on ProductVariant {
              id
            }
          }
        }
      }
    }
    attributes {
      key
      value
    }
    buyerIdentity {
      email
      customer {
        id
      }
    }
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
`

const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    node(id: $cartId) {
      ...cartDetails
    }
  }
  ${cartDetailsFragment}
`
export default getCartQuery
