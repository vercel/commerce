import { cartPayloadFragment } from '../queries/get-cart-query'

const setEmailOnAnonymousCart = /* GraphQL */ `
  mutation setEmailOnAnonymousCartMutation(
    $input: SetEmailOnAnonymousCartInput!
  ) {
    setEmailOnAnonymousCart(input: $input) {
      cart {
        ${cartPayloadFragment}
      }
    }
  }
`

export default setEmailOnAnonymousCart
