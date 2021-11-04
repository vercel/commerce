export const getAllRecipeCollectionsQuery = /* GraphQL */ `
query recipeCollections ($options: RecipeCollectionListOptions) {
  recipeCollections (options: $options){
    totalItems,
    items {
      id
      name
      slug
      recipes{
        items{
          id
          slug
          title
          description
          assets{
            id
            source
          }
          translations{
            slug
            title
          }
          ingredients{
            id
            name
            slug
            variants{
              id
              name
            }
          }
        }
        totalItems
      }
    }
  }
}
`
