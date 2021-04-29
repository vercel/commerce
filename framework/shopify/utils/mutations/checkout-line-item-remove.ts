import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemRemoveMutation = /* GraphQL */ `
  mutation checkoutLineItemRemove($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkoutDetails
      }
    }
  }
  ${checkoutDetailsFragment}
`
export default checkoutLineItemRemoveMutation
