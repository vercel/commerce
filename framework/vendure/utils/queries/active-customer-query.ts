import { searchResultFragment } from '../fragments/search-result-fragment'

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
          name
          slug
          assets{
            source
            preview
          }
          variants{
            price
          }
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
