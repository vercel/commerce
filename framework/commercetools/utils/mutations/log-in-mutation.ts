/* GraphQL */
export const loginMutation = `
  mutation customerSignInDraft($data: CustomerSignInDraft!) {
    customerSignIn(draft: $data) {
      customer {
        id
        email
        firstName
        lastName
        password
      }
      cart{
        id
      }
    }
  }
`
