export const getAllRecipePathsQuery = /* GraphQL */ `
query getAllRecipePaths($excludeBlogIds: [ID]! = [],$options:RecipeListOptions){
    recipes(excludeBlogIds: $excludeBlogIds,options: $options){
        items{
            translations {
                slug
            }
        }		
    } 	
}
`
