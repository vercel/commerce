import { searchResultFragment } from '../fragments/search-result-fragment'

export const searchQuery = /* GraphQL */ `
  query search($input: SearchInput!) {
    search(input: $input) {
      items {
        ...SearchResult
      }
      totalItems
    }
  }
  ${searchResultFragment}
`
