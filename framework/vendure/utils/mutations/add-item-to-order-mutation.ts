import { cartFragment } from '../fragments/cart-fragment'

export const addItemToOrderMutation = /* GraphQL */ `
  mutation addItemToOrder($variantId: ID!, $quantity: Int!) {
    addItemToOrder(productVariantId: $variantId, quantity: $quantity) {
      __typename
      ...Cart
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${cartFragment}
`
