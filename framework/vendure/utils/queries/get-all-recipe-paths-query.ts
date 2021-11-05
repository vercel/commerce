export const getAllRecipePathsQuery = /* GraphQL */ `
query getAllRecipePaths($options:RecipeListOptions){
    recipes(options: $options){
        items{
            translations {
                slug
            }
        }		
    } 	
}
`
