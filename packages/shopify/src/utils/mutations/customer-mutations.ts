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
      ...customerAccessToken
      ...customerUserErrors
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
      ...customerAccessToken
      ...customerUserErrors
    }
  }
  ${customerUserErrorsFragment}
  ${customerAccessTokenFragment}
`

export const customerAccessTokenCreateMutation = /* GraphQL */ `
  mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
    customerAccessTokenCreate(input: $input) {
      ...customerAccessToken
      ...customerUserErrors
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
      ...customerUserErrors
    }
  }
  ${customerUserErrorsFragment}
`

export const customerCreateMutation = /* GraphQL */ `
  mutation customerCreate($input: CustomerCreateInput!) {
    customerCreate(input: $input) {
      ...customerUserErrors
      customer {
        id
      }
    }
  }
  ${customerUserErrorsFragment}
`
