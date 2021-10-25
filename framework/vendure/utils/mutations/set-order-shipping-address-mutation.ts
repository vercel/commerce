export const setOrderShippingAddressMutation = /* GraphQL */ `
mutation setOrderShippingAddress($input: CreateAddressInput!) {
  setOrderShippingAddress(input: $input) {
    __typename
    ... on Order {
      id
      createdAt
      updatedAt
      code
      shippingAddress {
        streetLine1
        city
        province
        postalCode
        countryCode
        phoneNumber
      }
    }
    ... on ErrorResult {
      errorCode
      message
    }
  }
}
`
