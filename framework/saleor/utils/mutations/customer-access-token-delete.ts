export const sessionDestroy = /* GraphQL */ `
  mutation customerAccessTokenDelete {
    tokensDeactivateAll {
      errors {
        field
        message
      }
    }
  }
`
