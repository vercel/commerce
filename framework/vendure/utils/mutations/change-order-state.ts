export const changeOrderStatetMutation = /* GraphQL */ `
mutation TransitionToArrangingPayment($state: String!) {
  transitionOrderToState(state: $state) {
    ... on Order {
      id
      state
    }
    ...ErrorResult
    __typename
  }
}

fragment ErrorResult on ErrorResult {
  errorCode
  message
  __typename
}

`
