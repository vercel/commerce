export const SessionDestroy = /* GraphQL */ `
  mutation SessionDestroy {
    tokensDeactivateAll {
      errors {
        field
        message
      }
    }
  }
`
