import { cartFragment } from '../fragments/cart-fragment'

export const setCustomerForOrder = /* GraphQL */ `
  mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      __typename
      ...Cart
      ... on ErrorResult {
        errorCode
        message
      }
    }
  }
  ${cartFragment}
`
