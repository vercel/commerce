export const filterRecipesQuery = /* GraphQL */ `
query recipeByCollectionSlug($options: RecipeListOptions) {
    recipeByCollectionSlug(options: $options) {
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
