export const getFeatuedBlogQuery = /* GraphQL */ `
    query GetFeaturedBlog($options: BlogListOptions) {
        featuredBlogs( options: $options){
        items {
            id
            isPublish
            isFeatured
            authorName
            createdAt
            authorAvatarAsset{
                preview
            }
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