const customerUpdateMutation = /* GraphQL */ `
  mutation customerUpdate($input: CustomerInput!) {
    customerUpdate(input: $input) {
      customer {
        id
      }
      userErrors {
        field
        message
      }
      customer {
        id
        metafield(key: "my_fields", namespace: "wishlist") {
          id
          value
        }
      }
    }
  }
`

export default customerUpdateMutation
