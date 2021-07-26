// {
//   title: "John Adams"
//   firstName: "John"
//   lastName: "Adams"
//   phoneNumber: "+99312345678"
//   emailAddress: "john@example.com"
// }

export const setCustomerForOrderMutation = /* GraphQL*/ `
  mutation setCustomerForOrder($input: CreateCustomerInput!) {
    setCustomerForOrder(input: $input){
      __typename
      ...on Order {
        id
        state
        customer {
          id
        }
        totalQuantity
        lines {
          id
        }
      }
      ...on AlreadyLoggedInError {
        errorCode
        message
      }
      ...on NoActiveOrderError {
        errorCode
        message
      }
    }
  }
`