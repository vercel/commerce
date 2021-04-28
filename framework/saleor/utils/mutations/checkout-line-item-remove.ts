import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemRemoveMutation = /* GraphQL */ `
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
export default checkoutLineItemRemoveMutation
