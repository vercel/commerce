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
