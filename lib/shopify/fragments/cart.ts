import imageFragment from './image';

const cartFragment = /* GraphQL */ `
  fragment cart on Cart {
    id
    checkoutUrl
    attributes {
      key
      value
    }
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          cost {
            totalAmount {
              amount
              currencyCode
            }
          }
          merchandise {
            ... on ProductVariant {
              id
              title
              selectedOptions {
                name
                value
              }
              product {
                featuredImage {
                  ...image
                }
                handle
                title
                productType
              }
              coreVariantId: metafield(key: "coreVariant", namespace: "custom") {
                value
              }
              addOnQuantity: metafield(namespace: "custom", key: "add_on_quantity") {
                value
              }
              addOnProductId: metafield(namespace: "custom", key: "add_on") {
                value
              }
            }
          }
        }
      }
    }
    totalQuantity
  }
  ${imageFragment}
`;

export default cartFragment;
