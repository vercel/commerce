export const getSEOByPageQuery = /* GraphQL */ `
query SEOByPage($page:String!){
  SEOByPage(page:$page){
    id
    title,
    description,
    img{
      preview
    }
  }
}

`
