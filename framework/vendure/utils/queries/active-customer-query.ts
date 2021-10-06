export const activeCustomerQuery = /* GraphQL */ `
  query activeCustomer {
    activeCustomer {
      id
      firstName
      lastName
      emailAddress
      phoneNumber
      addresses{
        streetLine1
        city
        province
        postalCode
      }
    }
  }
`
