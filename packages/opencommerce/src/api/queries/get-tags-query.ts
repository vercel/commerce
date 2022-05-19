const getTagsQuery = /* GraphQL */ `
  query getTags($first: ConnectionLimitInt!, $shopId: ID!) {
    tags(first: $first, shopId: $shopId) {
      edges {
        node {
          _id
          displayTitle
          slug
        }
      }
    }
  }
`
export default getTagsQuery
