import { cartDetailsFragment } from '../queries/get-cart-query'

export const cartLinesRemoveMutation = /* GraphQL */ `
  mutation cartLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
