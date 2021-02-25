export const getPageQuery = /* GraphQL */ `
  query getPageBySlug($slug: String!) {
    pageByHandle(handle: $slug) {
      id
      title
      handle
      body
      bodySummary
      url
    }
  }
`
export default getPageQuery
