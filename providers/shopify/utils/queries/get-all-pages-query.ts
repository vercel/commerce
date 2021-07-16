export const getAllPagesQuery = /* GraphQL */ `
  query getAllPages($first: Int = 250) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
        }
      }
    }
  }
`
export default getAllPagesQuery
