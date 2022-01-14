
export const loginMutation = /* GraphQL */`
mutation login($loginInput:CustomerUserAuthInfoInput!) {
    account:createCustomerAuthTicket(customerUserAuthInfoInput:$loginInput) {
      accessToken
      userId
      refreshToken
      refreshTokenExpiration
      accessTokenExpiration
      customerAccount {
        id
        firstName
        lastName
        emailAddress
        userName
      }
    }
  }
`

