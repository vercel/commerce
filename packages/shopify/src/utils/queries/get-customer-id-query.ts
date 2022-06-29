export const getCustomerQuery = /* GraphQL */ `
  query getCustomerId($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }
`
