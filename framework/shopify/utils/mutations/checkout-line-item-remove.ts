import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemRemoveMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItemIds: [ID!]!) {
    checkoutLineItemsRemove(
      checkoutId: $checkoutId
      lineItemIds: $lineItemIds
    ) {
      userErrors {
        message
        field
      }
      checkout {
       ${checkoutDetailsFragment}
      }
    }
  }
`
export default checkoutLineItemRemoveMutation
