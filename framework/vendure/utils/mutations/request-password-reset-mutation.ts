export const requestPasswordReset = /* GraphQL */ `
mutation RequestPasswordReset($emailAddress: String!) {
    requestPasswordReset(emailAddress: $emailAddress) {
   			__typename
        ...on Success{
          success
        }
        ...on ErrorResult{
          errorCode
          message
        }
    }
}
`