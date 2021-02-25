import { checkoutDetailsFragment } from '../queries/get-checkout-query'

const checkoutLineItemAddMutation = /* GraphQL */ `
  mutation($checkoutId: ID!, $lineItems: [CheckoutLineItemInput!]!) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
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
export default checkoutLineItemAddMutation
