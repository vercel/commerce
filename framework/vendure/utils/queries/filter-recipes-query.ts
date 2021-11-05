export const filterRecipesQuery = /* GraphQL */ `
query recipeCollection($slug:String,$options:RecipeListOptions){
  recipeCollection(slug:$slug){
    recipes(options:$options){
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
}
`
