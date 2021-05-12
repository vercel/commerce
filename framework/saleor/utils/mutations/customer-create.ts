export const accountRegister = /* GraphQL */ `
  mutation customerCreate($input: AccountRegisterInput!) {
    accountRegister(input: $input) {
      errors {
        code
        field
        message
      }
      user {
        email
        isActive
      }
    }
  }
`
