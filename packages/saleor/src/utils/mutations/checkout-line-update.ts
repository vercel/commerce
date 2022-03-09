import * as fragment from '../fragments'

export const CheckoutLineUpdate = /* GraphQL */ `
  mutation CheckoutLineUpdate($checkoutId: ID!, $lineItems: [CheckoutLineInput!]!) {
    checkoutLinesUpdate(checkoutId: $checkoutId, lines: $lineItems) {
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
