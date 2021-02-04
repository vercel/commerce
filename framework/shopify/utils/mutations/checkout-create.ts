import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation {
    checkoutCreate(input: {}) {
      userErrors {
        message
        field
      }
      checkout {
        ${checkoutDetailsFragment}
      }
    }
  }
`
export default checkoutCreateMutation
