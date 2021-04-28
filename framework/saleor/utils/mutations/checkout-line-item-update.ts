import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemUpdateMutation = /* GraphQL */ `
  mutation checkoutLineItemUpdate($checkoutId: ID!, $lineItems: [CheckoutLineInput!]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lineItems) {
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
export default checkoutLineItemUpdateMutation
