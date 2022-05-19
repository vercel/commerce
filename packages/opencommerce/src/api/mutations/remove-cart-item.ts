import { cartPayloadFragment } from '../queries/get-cart-query'

const removeCartItemsMutation = `
  mutation removeCartItemsMutation($input: RemoveCartItemsInput!) {
    removeCartItems(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default removeCartItemsMutation
