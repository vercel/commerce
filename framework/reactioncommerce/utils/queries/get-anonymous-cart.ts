import { cartQueryFragment } from '../queries/get-checkout-query'

export const getAnomymousCart = `
  query anonymousCartByCartIdQuery($cartId: ID!, $cartToken: String!, $itemsAfterCursor: ConnectionCursor) {
    cart: anonymousCartByCartId(cartId: $cartId, cartToken: $cartToken) {
      ${cartQueryFragment}
    }
  }
`

export default getAnomymousCart
