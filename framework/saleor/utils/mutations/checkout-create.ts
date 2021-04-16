import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation createCheckout {
    checkoutCreate(input: {}) {
      checkoutUserErrors {
        code
        field
        message
      }
      # Breaks GraphQL Codegen
      # checkout { 
      #    ${checkoutDetailsFragment}
      # }
    }
  }
`
export default checkoutCreateMutation
