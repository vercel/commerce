import { cartFragment } from '../fragments/cart-fragment'

export const transitionOrderToState = /* GraphQL */ `
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      __typename
      ...Cart
      ... on OrderStateTransitionError {
        errorCode
        message
        transitionError
      }
    }
  }
  ${cartFragment}
`
