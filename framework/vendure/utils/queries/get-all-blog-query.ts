export const getAllBlogsQuery = /* GraphQL */ `
query GetBlogs ($options: BlogListOptions){
    blogs(options: $options){
        totalItems
        items {
          id
          isHidden
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
