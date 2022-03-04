export const getCustomerAccountQuery = /* GraphQL */`
query getUser {
    customerAccount:getCurrentAccount {
        id
        firstName
        lastName
        emailAddress
        userName
        isAnonymous
    }
}
`