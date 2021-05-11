import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation createCheckout {
    checkoutCreate(input: {
      email: "customer@example.com", 
      lines: [], 
      channel: "default-channel"
    }) {
      errors {
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
