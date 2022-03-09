export const PageMany = /* GraphQL */ `
  query PageMany($first: Int = 100) {
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
