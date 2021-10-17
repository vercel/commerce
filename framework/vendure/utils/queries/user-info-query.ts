export const userInfoQuery = /* GraphQL */ `
    query activeCustomer{
        activeCustomer{
            lastName
            firstName
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
