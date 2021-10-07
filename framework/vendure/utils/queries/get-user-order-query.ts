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
                total
                state
                code
                }
            }
        }
  }
`
