export const getRecipeByProductSlugQuery = /* GraphQL */ `
query recipeByProductSlug($slug:String,$options:RecipeListOptions){
  recipeByProductSlug(slug:$slug,options:$options){
   	 items{
      id
      assets{
        name
        preview
      }
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
        featuredAsset {
          preview
        }
        variants{
          id
          name
          priceWithTax
          currencyCode
        }
        collections {
          id
          name
        }
        facetValues {
          id
          code
          name
        }
      }
      recommendedRecipes{
        id
        title
        slug
        description
        featuredAsset{
          preview
        }
      }
    }
  }
}
`
