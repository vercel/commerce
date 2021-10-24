export const availableCountriesQuery = /* GraphQL */ `
query availableCountriesQuery {
  availableCountries {
    ...Country
    __typename
  }
}

fragment Country on Country {
  id
  code
  name
  enabled
  __typename
}
`
