export const transitionToArrangingPaymentMutation = /* GraphQL */ `
mutation TransitionToArrangingPayment {
  transitionOrderToState(state: "ArrangingPayment") {
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
