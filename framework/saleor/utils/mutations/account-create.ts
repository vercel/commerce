export const AccountCreate = /* GraphQL */ `
  mutation AccountCreate($input: AccountRegisterInput!) {
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
