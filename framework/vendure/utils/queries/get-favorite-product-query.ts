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
          featuredAsset{
            preview
          }
          assets{
            preview
          }
          variants{
            id
            name
            priceWithTax
            currencyCode
          }
          collections {
            id
            name
          }
          facetValues {
            id
            code
            name
          }
        }
      }
      totalItems
    }
  }
}
`
