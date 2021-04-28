import {
  cartPayloadFragment,
  incorrectPriceFailureDetailsFragment,
  minOrderQuantityFailureDetailsFragment,
} from '@framework/utils/queries/get-checkout-query'

const createCartMutation = /* GraphQL */ `
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
export default createCartMutation
