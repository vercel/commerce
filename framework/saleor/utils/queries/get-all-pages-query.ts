export const getAllPagesQuery = /* GraphQL */ `
  query getAllPages($first: Int = 100) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
`
export default getAllPagesQuery
