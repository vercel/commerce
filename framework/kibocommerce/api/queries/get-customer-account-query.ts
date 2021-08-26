export const getCustomerAccountQuery = `
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