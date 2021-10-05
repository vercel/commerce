export const userInfoQuery = /* GraphQL */ `
    query activeCustomer{
        activeCustomer{
            emailAddress
            addresses{
                name:fullName
                address:streetLine1
                city
                state:province
                postalCode
                phoneNumber
            }
        }
    }
`
