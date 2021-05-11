// FIXME move to `mutations/` @zaiste
export const getCustomerQuery = /* GraphQL */ `
  mutation getCustomer($customerAccessToken: String!) {
    tokenRefresh(csrfToken: $customerAccessToken) {
      token
      user {
        id
        email
        firstName
        lastName
        dateJoined
      }
      errors {
        code
        message
      }
    }
  }
`
export default getCustomerQuery
