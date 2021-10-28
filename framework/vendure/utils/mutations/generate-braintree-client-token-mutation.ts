export const generateBraintreeClientTokenMutation = /* GraphQL */ `
mutation generateBraintreeClientToken($orderId: ID!) {
  generateBraintreeClientToken (orderId: $orderId) {
    __typename
    token
  }
}
`
