import {
  customerUserErrorsFragment,
  customerAccessTokenFragment,
} from '../fragments/customer-fragments'

export const customerActivateMutation = /* GraphQL */ `
  mutation customerActivate($id: ID!, $input: CustomerActivateInput!) {
    customerActivate(id: $id, input: $input) {
      customer {
        id
      }
      customerAccessToken {
        ...customerAccessToken
      }
      customerUserErrors {
        ...customerUserErrors
      }
    }
  }
  ${customerUserErrorsFragment}
  ${customerAccessTokenFragment}
`
export const customerActivateByUrlMutation = /* GraphQL */ `
  mutation customerActivateByUrl($activationUrl: URL!, $password: String!) {
    customerActivateByUrl(activationUrl: $activationUrl, password: $password) {
      customer {
        id
      }
      customerAccessToken {
        ...customerAccessToken
      }
      customerUserErrors {
        ...customerUserErrors
      }
    }
  }
  ${customerUserErrorsFragment}
  ${customerAccessTokenFragment}
`

export const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      customerAccessToken {
        ...customerAccessToken
      }
      customerUserErrors {
        ...customerUserErrors
      }
    }
  }
  ${customerUserErrorsFragment}
  ${customerAccessTokenFragment}
`

export const customerAccessTokenDeleteMutation = /* GraphQL */ `
  mutation customerAccessTokenDelete($customerAccessToken: String!) {
    customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
      deletedAccessToken
      deletedCustomerAccessTokenId
      userErrors {
        field
        message
      }
    }
  }
`

export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      customerUserErrors {
        ...customerUserErrors
      }
      customer {
        id
      }
    }
  }
  ${customerUserErrorsFragment}
`
