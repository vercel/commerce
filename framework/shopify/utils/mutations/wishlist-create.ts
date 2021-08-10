import { wishlistDetailsFragment } from '../queries/get-wishlist-query'

const wishlistCreateMutation = /* GraphQL */ `
  mutation wishlistCreate($input: CartInput = {}) {
    cartCreate(input: $input) {
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
export default wishlistCreateMutation
