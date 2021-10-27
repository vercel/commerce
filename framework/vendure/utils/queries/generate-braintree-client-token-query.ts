export const generateBraintreeClientTokenQuery = /* GraphQL */ `
query generateBraintreeClientToken($orderId: ID!) {
  generateBraintreeClientToken (orderId: $orderId)
}
`
