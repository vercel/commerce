import { checkoutDetailsFragment } from '../queries/get-checkout-query'

export const checkoutLineDelete = /* GraphQL */ `
  mutation checkoutLineItemRemove($checkoutId: ID!, $lineId: ID!) {
    checkoutLineDelete(
      checkoutId: $checkoutId
      lineId: $lineId
    ) {
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
