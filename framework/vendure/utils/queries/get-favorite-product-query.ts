export const getFavoriteProductQuery = /* GraphQL */ `
query activeCustomer($options: FavoriteListOptions) {
  activeCustomer {
    id
    firstName
    lastName
    emailAddress
    favorites(options: $options){
      items{
        product{
          id
          name
          slug
          assets{
            source
            preview
          }
          variants{
            priceWithTax
            currencyCode
          }
        }
      }
      totalItems
    }
  }
}
`
