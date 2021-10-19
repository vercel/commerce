export const updateCustomerAddress = /* GraphQL */ `
    mutation updateCustomerAddress($input: UpdateAddressInput!){
        updateCustomerAddress(input: $input){
            __typename
            ...on Address{
                    id
                    streetLine1
                    city
                    postalCode
                    province
                }
        }
    }
`
