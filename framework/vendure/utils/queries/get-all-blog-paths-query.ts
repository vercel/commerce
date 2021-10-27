export const getAllBlogPathsQuery = /* GraphQL */ `
query getAllBlogPaths($excludeBlogIds: [ID]! = [],$customOptions:CustomBlogListOptions){
    blogs(excludeBlogIds: $excludeBlogIds,customOptions: $customOptions){
        items{
            translations {
                slug
            }
        }		
    } 	
}
`
