import {
  cartPayloadFragment,
  incorrectPriceFailureDetailsFragment,
  minOrderQuantityFailureDetailsFragment,
} from '../queries/get-cart-query'

const addCartItemsMutation = /* GraphQL */ `
  mutation addCartItemsMutation($input: AddCartItemsInput!) {
    addCartItems(input: $input) {
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
    }
  }
`

export default addCartItemsMutation
