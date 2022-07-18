export const customerUserErrorsFragment = /* GraphQL */ `
  fragment customerUserErrors on CustomerUserError {
    code
    field
    message
  }
`

export const customerAccessTokenFragment = /* GraphQL */ `
  fragment customerAccessToken on CustomerAccessToken {
    accessToken
    expiresAt
  }
`
