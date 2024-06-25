export const updateOrderMetafieldsMutation = /* GraphQL */ `
  mutation updateOrderMetafields($input: OrderInput!) {
    orderUpdate(input: $input) {
      order {
        id
      }
      userErrors {
        message
        field
      }
    }
  }
`;
