export const getAllCollectionsQuery = /* GraphQL */ `
query collections ($options: CollectionListOptions) {
  collections (options: $options){
    totalItems,
    items {
      id
      name
      slug
    }
  }
}
`
