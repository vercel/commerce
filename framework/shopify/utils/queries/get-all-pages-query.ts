export const getAllPagesQuery = /* GraphQL */ `
  query($first: Int!) {
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
