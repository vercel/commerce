export const sessionCreate = /* GraphQL */ `
  mutation tokenCreate($email: String!, $password: String!) {
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
