import { cartFragment } from '../fragments/cart-fragment'

export const getCartQuery = /* GraphQL */ `
  query activeOrder {
    activeOrder {
      ...Cart
    }
  }
  ${cartFragment}
`
