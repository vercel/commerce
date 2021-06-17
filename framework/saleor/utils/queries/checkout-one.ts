import * as fragment from '../fragments'

export const CheckoutOne = /* GraphQL */ `
  query CheckoutOne($checkoutId: UUID!) {
    checkout(token: $checkoutId) {
      ... on Checkout {
        ...CheckoutDetails
      }
    }
  }
  ${fragment.CheckoutDetails}
`
