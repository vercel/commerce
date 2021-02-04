export const checkoutDetailsFragment = /* GraphQL */ `
  id
  webUrl
  subtotalPrice
  totalTax
  totalPrice
  currencyCode
  lineItems(first: 250) {
    pageInfo {
      hasNextPage
      hasPreviousPage
    }
    edges {
      node {
        id
        title
        variant {
          id
          sku
          title
          image {
            src
          }
          price
        }
        quantity
      }
    }
  }
`

const getCheckoutQuery = /* GraphQL */ `
  query($checkoutId: ID!) {
    node(id: $checkoutId) {
      ... on Checkout {
        ${checkoutDetailsFragment}
      }
    }
  }
`
export default getCheckoutQuery
