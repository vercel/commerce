export const getUserOrderQuery = /* GraphQL */ `
    query activeCustomer {
        activeCustomer {
            orders{
                items{
                    code
                    lines{
                        productVariant{
                            id
                            name
                        }
                    quantity
                    }
                totalWithTax
                state
                code
                currencyCode
                }
            }
        }
  }
`
