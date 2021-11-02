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
