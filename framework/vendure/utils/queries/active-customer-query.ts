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
      id
      streetLine1
      city
      province
      postalCode
      country{
        code
        name
      }
    } 
  }
}
`
