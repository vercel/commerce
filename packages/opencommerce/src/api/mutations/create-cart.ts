import {
  cartPayloadFragment,
  incorrectPriceFailureDetailsFragment,
  minOrderQuantityFailureDetailsFragment,
} from '../queries/get-cart-query'

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
