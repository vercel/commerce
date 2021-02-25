export const getPageQuery = /* GraphQL */ `
  query($first: Int!) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
          body
          url
        }
      }
    }
  }
`
export default getPageQuery
