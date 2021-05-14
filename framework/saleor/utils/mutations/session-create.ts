export const SessionCreate = /* GraphQL */ `
  mutation SessionCreate($email: String!, $password: String!) {
    tokenCreate(email: $email, password: $password) {
      token
      refreshToken
      csrfToken
      errors {
        code
        field
        message
      }
    }
  }
`
