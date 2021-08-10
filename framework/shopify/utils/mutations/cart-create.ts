import { wishlistDetailsFragment } from '../queries/get-wishlist-query'

const cartCreateMutation = /* GraphQL */ `
  mutation cartCreate($input: CartInput = {}) {
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
export default cartCreateMutation
