export const resetPasswordMutation = /* GraphQL */ `
mutation resetPassword($token: String!,$password: String!){
    resetPassword(token: $token,password: $password){
      __typename	
        ...on CurrentUser{
        id
        identifier
      }
        ...on ErrorResult{
        errorCode
        message
      }
    }
}
`