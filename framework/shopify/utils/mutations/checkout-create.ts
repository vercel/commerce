const checkoutCreateMutation = /* GraphQL */ `
  mutation {
    checkoutCreate(input: {}) {
      userErrors {
        message
        field
      }
      checkout {
        id
        webUrl
      }
    }
  }
`
export default checkoutCreateMutation
