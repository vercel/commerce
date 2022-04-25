const getShopCurrencyQuery = /* GraphQL */ `
  query getShopCurrency($id: ID!) {
    shop(id: $id) {
      currency {
        code
      }
    }
  }
`

export default getShopCurrencyQuery
