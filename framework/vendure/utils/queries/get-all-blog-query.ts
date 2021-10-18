export const getAllBlogsQuery = /* GraphQL */ `
query GetBlogs($excludeBlogIds: [ID]!,  $options: BlogListOptions) {
  blogs(excludeBlogIds: $excludeBlogIds, options: $options) {
    totalItems
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
