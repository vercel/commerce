export const getRecipeDetailQuery = /* GraphQL */ `
query getRecipe($slug: String ){
  recipe(slug:$slug){
    id
     featuredAsset {
           preview
         }
    translations{
      title
      slug
      description
      content
    }
    ingredients{
      id
      name
      slug
      assets{
        preview
      }
      variants{
        priceWithTax
      }
    }
  }
}
`