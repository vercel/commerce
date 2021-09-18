export const getCustomerQuery = /* GraphQL */ `
  query getCustomer {
    customer {
      id
      firstName
      lastName
      displayName
      email
    }
  }
`
export default getCustomerQuery
