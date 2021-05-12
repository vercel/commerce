export const checkoutCustomerAttach = /* GraphQl */ `
  mutation associateCustomerWithCheckout($checkoutId: ID!) {
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
