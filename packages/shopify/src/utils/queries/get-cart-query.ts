import { cartDetailsFragment } from '../fragments/cart-details-fragment'

export const getCartQuery = /* GraphQL */ `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...cartDetails
    }
  }
  ${cartDetailsFragment}
`
