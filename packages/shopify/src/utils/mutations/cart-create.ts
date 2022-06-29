import { cartDetailsFragment } from '../queries/get-cart-query'

export const cartCreateMutation = /* GraphQL */ `
  mutation cartCreate($input: CartInput = {}) {
    cartCreate(input: $input) {
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
