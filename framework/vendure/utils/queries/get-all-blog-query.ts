export const getAllBlogsQuery = /* GraphQL */ `
query GetBlogs($excludeBlogIds: [ID]!,  $customOptions: CustomBlogListOptions) {
  blogs(excludeBlogIds: $excludeBlogIds, customOptions: $customOptions) {
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
      title
      slug
      description
      content
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
