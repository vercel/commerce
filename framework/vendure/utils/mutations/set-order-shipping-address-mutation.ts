export const setOrderShippingAddressMutation = /* GraphQL */ `
  mutation setOrderShippingAddress($input: CreateAddressInput!) {
    setOrderShippingAddress(input: $input) {
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
    }
  }
`