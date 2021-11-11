export const filterRecipesQuery = /* GraphQL */ `
query recipeByCollectionSlug($slug:String, $options: RecipeListOptions) {
    recipeByCollectionSlug(slug:$slug,options: $options) {
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
