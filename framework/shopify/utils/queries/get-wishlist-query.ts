export const wishlistDetailsFragment = /* GraphQL */ `
  fragment wishlistDetails on Cart {
    id
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
                id
                title
                description
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
  }
`

const getWishlistQuery = /* GraphQL */ `
  query getWishlist($cartId: ID!) {
    cart(id: $cartId) {
      ...wishlistDetails
    }
  }
  ${wishlistDetailsFragment}
`
export default getWishlistQuery
