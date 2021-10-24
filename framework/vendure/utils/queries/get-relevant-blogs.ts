export const getRelevantBlogsQuery = /* GraphQL */ `
query relevantBlogs($productId: ID!){
    relevantBlogs(productId:$productId){
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
