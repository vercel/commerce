import { cartPayloadFragment } from '@framework/utils/queries/get-checkout-query'

const updateCartItemsQuantityMutation = `
  mutation removeCartItemsMutation($input: RemoveCartItemsInput!) {
    removeCartItems(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default updateCartItemsQuantityMutation
