export const setCustomerForOrderMutation = /* GraphQL */ `
mutation setCustomerForOrder($input: CreateCustomerInput!) {
  setCustomerForOrder(input: $input) {
    __typename
    ... on Order {
      id
      createdAt
      updatedAt
      code
      customer {
        id
        firstName
        lastName
        emailAddress
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
