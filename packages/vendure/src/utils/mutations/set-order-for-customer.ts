import { cartFragment } from '../fragments/cart-fragment'

export const setCustomerForOrder = /* GraphQL */ `
  mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input) {
      ...Cart
    }
  }
  ${cartFragment}
`
