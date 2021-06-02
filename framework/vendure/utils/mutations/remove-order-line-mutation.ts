import { cartFragment } from '../fragments/cart-fragment'

export const removeOrderLineMutation = /* GraphQL */ `
  mutation removeOrderLine($orderLineId: ID!) {
    removeOrderLine(orderLineId: $orderLineId) {
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
