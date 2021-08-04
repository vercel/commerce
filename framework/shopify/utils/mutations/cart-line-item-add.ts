import { cartDetailsFragment } from '../queries/get-cart-query'

const cartLinesAddMutation = /* GraphQL */ `
  mutation cartLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {
    cartLinesAdd(lines: $lines, cartId: $cartId) {
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
export default cartLinesAddMutation
