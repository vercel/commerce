import { cartPayloadFragment } from '../queries/get-cart-query'

const updateCartItemsQuantityMutation = `
  mutation updateCartItemsQuantity($updateCartItemsQuantityInput: UpdateCartItemsQuantityInput!) {
    updateCartItemsQuantity(input: $updateCartItemsQuantityInput) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default updateCartItemsQuantityMutation
