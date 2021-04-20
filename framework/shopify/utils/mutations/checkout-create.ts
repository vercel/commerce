import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation {
    checkoutCreate(input: {}) {
      checkoutUserErrors {
        code
        field
        message
      }
      ...checkoutDetails
    }
  }

  ${checkoutDetailsFragment}
`
export default checkoutCreateMutation
