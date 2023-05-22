import { customItemFragment, digitalItemFragment, physicalItemFragment } from '../fragments/cart';

export const getCartQuery = /* GraphQL */ `
  query getCart($entityId: String!) {
    site {
      cart(entityId: $entityId) {
        entityId
        currencyCode
        isTaxIncluded
        amount {
          currencyCode
          value
        }
        lineItems {
          physicalItems {
            ...physicalItem
          }
          digitalItems {
            ...digitalItem
          }
          customItems {
            ...customItem
          }
          giftCertificates {
            entityId
            name
            theme
            amount {
              currencyCode
              value
            }
            isTaxable
            sender {
              name
              email
            }
            recipient {
              name
              email
            }
            message
          }
          customItems {
            entityId
            sku
            name
            quantity
            listPrice {
              currencyCode
              value
            }
            extendedListPrice {
              currencyCode
              value
            }
          }
          totalQuantity
        }
        createdAt {
          utc
        }
        updatedAt {
          utc
        }
        locale
      }
    }
  }
  ${physicalItemFragment}
  ${digitalItemFragment}
  ${customItemFragment}
`;

export const getCheckoutNodeQuery = /* GraphQL */ `
  query getCheckoutNode($nodeId: ID!) {
    node(id: $nodeId) {
      ... on Checkout {
        entityId
        subtotal {
          currencyCode
          value
        }
        taxTotal {
          currencyCode
          value
        }
        grandTotal {
          currencyCode
          value
        }
      }
    }
  }
`;
