import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemAddMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
export default checkoutLineItemAddMutation
