import {
  cartPayloadFragment,
  incorrectPriceFailureDetailsFragment,
  minOrderQuantityFailureDetailsFragment,
} from '@framework/utils/queries/get-cart-query'

const addCartItemsMutation = `
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
