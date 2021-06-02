import { searchResultFragment } from '../fragments/search-result-fragment'

export const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($input: SearchInput!) {
    search(input: $input) {
      items {
        ...SearchResult
      }
    }
  }
  ${searchResultFragment}
`
