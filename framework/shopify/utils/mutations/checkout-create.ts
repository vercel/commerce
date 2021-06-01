import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation {
    checkoutCreate(input: {}) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ${checkoutDetailsFragment}
      }
    }
  }
`
export default checkoutCreateMutation
