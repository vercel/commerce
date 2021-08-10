import { wishlistDetailsFragment } from '../queries/get-wishlist-query'

const wishlistLinesAddMutation = /* GraphQL */ `
  mutation wishlistLinesAdd($lines: [CartLineInput!]!, $cartId: ID!) {
    cartLinesAdd(lines: $lines, cartId: $cartId) {
      cart {
        ...wishlistDetails
      }
      userErrors {
        code
        field
        message
      }
    }
  }
  ${wishlistDetailsFragment}
`
export default wishlistLinesAddMutation
