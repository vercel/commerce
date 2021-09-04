export const getPageQuery = /* GraphQL */ `
  query allPosts {
    posts {
      nodes {
        id
        title
        date
      }
    }
  }
`
export default getPageQuery
