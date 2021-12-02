export const loginGoogleMutation = /* GraphQL */ `
mutation Authenticate($token: String!) {
    authenticate(input: {
      google: { token: $token }
    }) {
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
