export const transitionOrderToStateMutation = /* GraphQL */ `
  mutation transitionOrderToState($state: String!) {
    transitionOrderToState(state: $state) {
      __typename
      ...on Order {
        id
        state
        customer {
          id
        }
        totalQuantity
        lines {
          id
        }
      }
      ...on ErrorResult {
        errorCode
        message
      }
      ...on OrderStateTransitionError {
        errorCode
        message
        transitionError
        fromState
        toState
      }
    }
  }
`