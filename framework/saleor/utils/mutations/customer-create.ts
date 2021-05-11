const customerCreateMutation = /* GraphQL */ `
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
export default customerCreateMutation
