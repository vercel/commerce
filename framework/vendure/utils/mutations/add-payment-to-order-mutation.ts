export const addPaymentToOrderMutation = /***/`
  mutation addPaymentToOrder($input: PaymentInput!) {
    addPaymentToOrder(input: $input) {
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
      ...on OrderPaymentStateError {
        errorCode
        message
      }
      ...on IneligiblePaymentMethodError {
        errorCode
        message
        eligibilityCheckerMessage
      }
      ...on ErrorResult {
        errorCode
        message
      }
    }
  }
`