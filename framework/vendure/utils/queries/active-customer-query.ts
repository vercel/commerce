export const activeCustomerQuery = /* GraphQL */ `
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      favorites{
        items{
          product{
            id
          }
        }
      }
    }
  }
`
