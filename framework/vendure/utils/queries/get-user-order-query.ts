export const getUserOrderQuery = /* GraphQL */ `
    query activeCustomer {
        activeCustomer {
            orders{
                items{
                    lines{
                        productVariant{
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
