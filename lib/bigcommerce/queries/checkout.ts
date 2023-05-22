export const getCheckoutQuery = /* GraphQL */ `
  query getCheckout($entityId: String) {
    site {
      checkout(entityId: $entityId) {
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
