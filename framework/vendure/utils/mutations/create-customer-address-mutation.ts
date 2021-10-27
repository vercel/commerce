export const createAddress = /* GraphQL */ `
    mutation createCustomerAddress($input: CreateAddressInput!){
        createCustomerAddress(input: $input){
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
