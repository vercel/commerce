export const getAllRecipeCollectionsQuery = /* GraphQL */ `
query recipeCollections ($options: RecipeCollectionListOptions) {
  recipeCollections (options: $options){
    totalItems,
    items {
      id
      name
      slug
      featuredAsset {
        preview
      }
      recipes{
        items{
          id
          slug
          title
          description
          featuredAsset{
            preview
          }
          translations{
            slug
            title
            description
            content
          }
        }
        totalItems
      }
    }
  }
}
`
