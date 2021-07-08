export const getPageQuery = /* GraphQL */ `
  query($id: ID!) {
    node(id: $id) {
      id
      ... on Page {
        title
        handle
        body
        bodySummary
      }
    }
  }
`
export default getPageQuery
