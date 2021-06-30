/* GraphQL */
const getCustomerQuery = `query ($id: String!) {
    customer(id: $id) {
      id
      firstName
      lastName
      email
    }
  }`

export default getCustomerQuery
