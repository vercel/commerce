export const PageMany = /* GraphQL */ `
  query PageMany($first: Int = 50) {
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
