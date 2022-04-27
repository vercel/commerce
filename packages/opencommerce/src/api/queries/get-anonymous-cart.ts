import { cartQueryFragment } from './get-cart-query'

export const getAnonymousCart = /* GraphQL */ `
  query anonymousCartByCartIdQuery($cartId: ID!, $cartToken: String!) {
    cart: anonymousCartByCartId(cartId: $cartId, cartToken: $cartToken) {
      ${cartQueryFragment}
    }
  }
`

export default getAnonymousCart
