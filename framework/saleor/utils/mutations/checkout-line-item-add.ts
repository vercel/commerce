import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemAddMutation = /* GraphQL */ `
  mutation checkoutLineItemAdd($checkoutId: ID!, $lineItems: [CheckoutLineInput!]!) {
    checkoutLinesAdd(checkoutId: $checkoutId, lines: $lineItems) {
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
export default checkoutLineItemAddMutation
