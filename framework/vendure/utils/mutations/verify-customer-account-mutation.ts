export const verifyCustomerAccountMutaton = /* GraphQL */ `
  mutation verifyCustomerAccount($token: String!, $password: String) {
  verifyCustomerAccount( token: $token, password: $password) {
      __typename
      ...on CurrentUser {
          id
          identifier
      }
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
`
