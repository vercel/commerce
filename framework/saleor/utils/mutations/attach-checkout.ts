export const AttachCheckout = /* GraphQl */ `
  mutation AttachCheckout($checkoutId: ID!) {
    checkoutCustomerAttach(checkoutId: $checkoutId) {
      errors {
        message
      }
      checkout {
        id
      }
    }
  }
`
