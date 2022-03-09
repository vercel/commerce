const createUserMutation = /* GraphQL */ `
  mutation createUser($input: CreateUserInput!) {
    createUser(user: $input) {
      loginResult {
        tokens {
          refreshToken
          accessToken
        }
      }
    }
  }
`
export default createUserMutation
