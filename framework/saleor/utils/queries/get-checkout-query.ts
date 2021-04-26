export const checkoutDetailsFragment = `
  id
  token
`

const getCheckoutQuery = /* GraphQL */ `
  query($checkoutId: UUID!) {
    checkout(token: $checkoutId) {
      ... on Checkout {
        ${checkoutDetailsFragment}
      }
    }
  }
`
export default getCheckoutQuery
