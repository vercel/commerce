export const recommendedProductsInCartQuery = /* GraphQL */ `
query recommendedProductsInCart($take: Int) {
  recommendedProductsInCart(take: $take) {
    totalItems
    items {
      id
      name
      description
      slug
      featuredAsset {
        preview
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
      variants {
        id
        name
        currencyCode
        priceWithTax
      }
    }
  }
}
`

