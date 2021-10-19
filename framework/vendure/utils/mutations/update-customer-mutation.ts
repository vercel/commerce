export const updateCustomer = /* GraphQL */ `
    mutation updateCustomer($input: UpdateCustomerInput!){
        updateCustomer(input:$input){
            __typename 
            ...on Customer{
                id
                firstName
                lastName
                phoneNumber
            }
        }
  }
`
