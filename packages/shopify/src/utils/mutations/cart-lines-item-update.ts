import { cartDetailsFragment } from '../queries/get-cart-query'

export const cartLinesUpdateMutation = /* GraphQL */ `
  mutation cartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...cartDetails
      }
      userErrors {
        code
        field
        message
      }
    }
  }
  ${cartDetailsFragment}
`
