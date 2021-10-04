export const getAllFacetsQuery = /* GraphQL */ `
query facets ($options: FacetListOptions) {
  facets (options: $options){
    totalItems,
    items {
      id
      name
      code
      values {
        id
        name
        code
      }
    }
  }
}
`
