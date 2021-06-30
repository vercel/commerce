/* GraphQL */
export const signupMutation = `
  mutation createCustomer($data: CustomerSignUpDraft!) {
    customerSignUp (draft: $data) {
        customer {
            id
        }
    }
  }
`
