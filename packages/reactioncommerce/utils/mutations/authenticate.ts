const authenticateMutation = /* GraphQL */ `
  mutation authenticate(
    $serviceName: String!
    $params: AuthenticateParamsInput!
  ) {
    authenticate(serviceName: $serviceName, params: $params) {
      sessionId
      tokens {
        refreshToken
        accessToken
      }
    }
  }
`
export default authenticateMutation
