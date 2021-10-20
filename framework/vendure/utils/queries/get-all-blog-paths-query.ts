export const getAllBlogPathsQuery = /* GraphQL */ `
query getAllBlogPaths($excludeBlogIds: [ID]! = [],$options:BlogListOptions){
    blogs(excludeBlogIds: $excludeBlogIds,options: $options){
        items{
            translations {
                slug
            }
        }		
    } 	
}
`
