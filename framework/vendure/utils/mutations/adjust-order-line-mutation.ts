import { cartFragment } from '../fragments/cart-fragment'

export const adjustOrderLineMutation = /* GraphQL */ `
  mutation adjustOrderLine($orderLineId: ID!, $quantity: Int!) {
    adjustOrderLine(orderLineId: $orderLineId, quantity: $quantity) {
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
