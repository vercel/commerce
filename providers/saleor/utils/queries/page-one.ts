export const PageOne = /* GraphQL */ `
  query PageOne($id: ID!) {
    page(id: $id) {
      id
      title
      slug
    }
  }
`
