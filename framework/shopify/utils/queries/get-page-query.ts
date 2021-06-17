export const getPageQuery = /* GraphQL */ `
  query getPage($id: ID!) {
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
