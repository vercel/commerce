export const getAllProductPathsQuery = /* GraphQL */ `
  query getAllProductPaths($first: Int = 100) {
    products(options: { take: $first }) {
      items {
        slug
      }
    }
  }
`
