import * as fragment from '../fragments'

export const CheckoutLineDelete = /* GraphQL */ `
  mutation CheckoutLineDelete($checkoutId: ID!, $lineId: ID!) {
    checkoutLineDelete(checkoutId: $checkoutId, lineId: $lineId) {
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
