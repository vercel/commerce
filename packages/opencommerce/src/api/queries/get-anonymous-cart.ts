import { cartQueryFragment } from './get-cart-query'

export const getAnonymousCart = `
  query anonymousCartByCartIdQuery($cartId: ID!, $cartToken: String!, $itemsAfterCursor: ConnectionCursor) {
    cart: anonymousCartByCartId(cartId: $cartId, cartToken: $cartToken) {
      ${cartQueryFragment}
    }
  }
`

export default getAnonymousCart
