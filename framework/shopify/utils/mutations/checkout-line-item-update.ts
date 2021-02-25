import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemUpdateMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemUpdateInput!]!) {
    checkoutLineItemsUpdate(checkoutId: $checkoutId, lineItems: $lineItems) {
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
export default checkoutLineItemUpdateMutation
