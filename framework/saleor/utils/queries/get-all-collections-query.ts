const getSiteCollectionsQuery = /* GraphQL */ `
  query getSiteCollections($first: Int!, $channel: String = "default-channel") {
    collections(first: $first, channel: $channel) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`
export default getSiteCollectionsQuery
