export const getCustomerAdminQuery = /* GraphQL */ `
  query getCustomerAdmin($id: ID!) {
    customer(id: $id) {
      metafield(namespace: "my_fields", key: "wishlist") {
        id
        value
      }
    }
  }
`
export default getCustomerAdminQuery
