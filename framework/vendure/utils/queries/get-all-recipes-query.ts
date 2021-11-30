export const getAllRecipesQuery = /* GraphQL */ `
query getRecipes($options: RecipeListOptions) {
  recipes( options: $options) {
    totalItems
    items {
      id
        title
        slug
        description
        content
        featuredAsset {
          preview
        }
    }
  }
}
`
