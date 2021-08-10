import { wishlistDetailsFragment } from '../queries/get-wishlist-query'

const wishlistLinesRemoveMutation = /* GraphQL */ `
  mutation wishlistLinesRemove($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
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
export default wishlistLinesRemoveMutation
