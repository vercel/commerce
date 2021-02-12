export const getPageQuery = /* GraphQL */ `
  query($first: Int!) {
    pages(first: $first) {
      edges {
        node {
          id
          title
          handle
          body
          bodySummary
          url
        }
      }
    }
  }
`
export default getPageQuery
