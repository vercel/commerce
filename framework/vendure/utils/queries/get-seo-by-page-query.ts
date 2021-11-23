export const getSEOByPageQuery = /* GraphQL */ `
query SEOByPage($page:PageNameSEO!,$options: SEOListOptions){
  SEOByPage(page:$page,options:$options){
    items{
      id
      title,
      description,
      img{
        preview
      }
    }
  }
}
`
