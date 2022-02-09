
const registerUserMutation = /* GraphQL */`
mutation registerUser($customerAccountInput: CustomerAccountInput!) {
  account:createCustomerAccount(customerAccountInput:$customerAccountInput) {
        emailAddress
        userName
        firstName
        lastName
        localeCode
        userId
        id
        isAnonymous
          attributes {
          values
          fullyQualifiedName
        }
    }
}`;

const registerUserLoginMutation = /* GraphQL */`
mutation registerUserLogin($accountId: Int!, $customerLoginInfoInput: CustomerLoginInfoInput!) {
  account:createCustomerAccountLogin(accountId:$accountId, customerLoginInfoInput:$customerLoginInfoInput) {
      accessToken
      accessTokenExpiration
      refreshToken
      refreshTokenExpiration
      userId
      customerAccount {
          id
          emailAddress
          firstName
          userName
      }
  }
}`;

export {
  registerUserMutation,
  registerUserLoginMutation
};

