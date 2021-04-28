const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: UserCreateInput!) {
    customerCreate(input: $input) {
      errors {
        code
        field
        message
      }
      customer {
        id
      }
    }
  }
`
export default customerCreateMutation
