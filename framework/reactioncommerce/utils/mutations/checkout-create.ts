import {
  cartPayloadFragment,
  incorrectPriceFailureDetailsFragment,
  minOrderQuantityFailureDetailsFragment,
} from '@framework/utils/queries/get-checkout-query'

const checkoutCreateMutation = /* GraphQL */ `
  mutation createCartMutation($input: CreateCartInput!) {
    createCart(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
      incorrectPriceFailures {
        ${incorrectPriceFailureDetailsFragment}
      }
      minOrderQuantityFailures {
        ${minOrderQuantityFailureDetailsFragment}
      }
      clientMutationId
      token
    }
  }
`
export default checkoutCreateMutation
