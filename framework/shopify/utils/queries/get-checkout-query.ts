export const checkoutDetailsFragment = /* GraphQL */ `
  fragment checkoutDetails on Checkout {
    id
    webUrl
    subtotalPriceV2 {
      amount
      currencyCode
    }
    totalTaxV2 {
      amount
      currencyCode
    }
    totalPriceV2 {
      amount
      currencyCode
    }
    completedAt
    createdAt
    taxesIncluded
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
            selectedOptions {
              name
              value
            }
            image {
              originalSrc
              altText
              width
              height
            }
            priceV2 {
              amount
              currencyCode
            }
            compareAtPriceV2 {
              amount
              currencyCode
            }
            product {
              handle
            }
          }
          quantity
        }
      }
    }
  }
`

const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($checkoutId: ID!) {
    node(id: $checkoutId) {
      ...checkoutDetails
    }
  }
  ${checkoutDetailsFragment}
`
export default getCheckoutQuery
