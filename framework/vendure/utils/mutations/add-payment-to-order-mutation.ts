export const addPaymentToOrderMutation = /* GraphQL */ `
mutation addPaymentToOrder($input: PaymentInput!) {
  addPaymentToOrder(input: $input) {
  	... on Order {
      __typename
      id
      state
    }
    
    ...on ErrorResult {
      errorCode
      message
      __typename
    }
  }
}
`
