import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation createCheckout {
    checkoutCreate(input: {
      email: "customer@example.com", 
      lines: [{quantity: 1, variantId: "UHJvZHVjdFZhcmlhbnQ6Mjk3"}], 
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
