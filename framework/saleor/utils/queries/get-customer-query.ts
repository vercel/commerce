export const getCustomerQuery = /* GraphQL */ `
  query getCustomer {
    me {
      id
      email
      firstName
      lastName
      dateJoined
    }
  }
`
export default getCustomerQuery
