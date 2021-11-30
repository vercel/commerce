export const filterRecipesQuery = /* GraphQL */ `
query recipeByCollectionSlug($slug:String, $options: RecipeListOptions) {
    recipeByCollectionSlug(slug:$slug,options: $options) {
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
