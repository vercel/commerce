import { cartFragment } from '../../utils/fragments/cart-fragment'

export const setOrderBillingAddress = /* GraphQL */ `
  mutation setOrderBillingAddress ($input: CreateAddressInput!){
    setOrderBillingAddress(input: $input) {
      __typename
      ...Cart
      ... on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
  ${cartFragment}
`
