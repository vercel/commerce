export const getPageQuery = /* GraphQL */ `
  query($id: ID!) {
    page(id: $id) {
      id
      title
      slug
    }
  }
`
