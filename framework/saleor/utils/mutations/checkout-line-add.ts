import * as fragment from '../fragments'

export const CheckoutLineAdd = /* GraphQL */ `
  mutation CheckoutLineAdd($checkoutId: ID!, $lineItems: [CheckoutLineInput!]!) {
    checkoutLinesAdd(checkoutId: $checkoutId, lines: $lineItems) {
      errors {
        code
        field
        message
      }
      checkout {
        ...CheckoutDetails
      }
    }
  }
  ${fragment.CheckoutDetails}
`
