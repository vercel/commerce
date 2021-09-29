import { gql } from 'graphql-request'


export const VERIFY_CUSTOMER_ACCOUNT = gql`
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


