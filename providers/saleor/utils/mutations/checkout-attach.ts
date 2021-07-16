export const CheckoutAttach = /* GraphQl */ `
  mutation CheckoutAttach($checkoutId: ID!) {
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
