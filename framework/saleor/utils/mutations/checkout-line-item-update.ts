import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemUpdateMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
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
