const customerAccessTokenDeleteMutation = /* GraphQL */ `
  mutation customerAccessTokenDelete {
    tokensDeactivateAll {
      errors {
        field
        message
      }
    }
  }
`

export default customerAccessTokenDeleteMutation
