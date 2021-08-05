import { cartDetailsFragment } from '../queries/get-cart-query'

const cartCreateMutation = /* GraphQL */ `
  mutation cartCreate {
    cartCreate {
      cart {
        id
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
export default cartCreateMutation
