export const getAllRecipesQuery = /* GraphQL */ `
query getRecipes( $options: RecipeListOptions) {
  recipes( options: $options) {
    totalItems
    items {
      id
      featuredAsset {
        preview
      }
      translations {
        title
        slug
        description
        content
      }
    }
  }
}
`
