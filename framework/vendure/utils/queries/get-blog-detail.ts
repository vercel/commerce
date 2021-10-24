export const getBlogDetailQuery = /* GraphQL */ `
query getBlog($slug: String ){
    blog(slug: $slug){
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
         relevantProducts{
           id
          }
       } 	
   }
`