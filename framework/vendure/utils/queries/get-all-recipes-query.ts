export const getAllRecipesQuery = /* GraphQL */ `
query getRecipes($excludeBlogIds: [ID]!,  $options: RecipeListOptions) {
  recipes(excludeBlogIds: $excludeBlogIds, options: $options) {
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
