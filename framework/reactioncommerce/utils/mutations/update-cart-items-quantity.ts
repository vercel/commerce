import { cartPayloadFragment } from '@framework/utils/queries/get-cart-query'

const updateCartItemsQuantityMutation = `
  mutation UpdateCartItemsQuantity($updateCartItemsQuantityInput: UpdateCartItemsQuantityInput!) {
    updateCartItemsQuantity(input: $updateCartItemsQuantityInput) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default updateCartItemsQuantityMutation
