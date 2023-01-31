export const cartDetailsFragment = /* GraphQL */ `
  fragment CartDetails on Cart {
    id
    checkoutUrl
    createdAt
    updatedAt
    lines(first: 10) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              id
              sku
              title
              selectedOptions {
                name
                value
              }
              image {
                url
                altText
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
              product {
                title
                handle
              }
            }
          }
        }
      }
    }
    attributes {
      key
      value
    }
    buyerIdentity {
      email
      customer {
        id
      }
    }
    estimatedCost {
      totalAmount {
        amount
        currencyCode
      }
      subtotalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
      totalDutyAmount {
        amount
        currencyCode
      }
    }
  }
`

export const userErrorsFragment = /* GraphQL */ `
  fragment UserErrors on CartUserError {
    code
    field
    message
  }
`
