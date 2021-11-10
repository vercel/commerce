import { cartFragment } from '../fragments/cart-fragment'

export const addItemsToOrderMutation = /* GraphQL */ `
mutation addItemsToOrder($input: [AddItemToOrderInput!]!) {
  addItemsToOrder(input: $input) {
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
