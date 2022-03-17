import { cartFragment } from '../fragments/cart-fragment'

export const transitionOrderToState = /* GraphQL */ `
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      ...Cart
      ... on OrderStateTransitionError {
        errorCode
        message
      }
    }
  }
  ${cartFragment}
`
