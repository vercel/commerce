import { checkoutDetailsFragment } from '../queries/get-checkout-query'

export const checkoutLineAdd = /* GraphQL */ `
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
