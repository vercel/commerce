export const CustomerOne = /* GraphQL */ `
  query CustomerOne($customerAccessToken: String!) {
    customer(customerAccessToken: $customerAccessToken) {
      id
    }
  }
`
