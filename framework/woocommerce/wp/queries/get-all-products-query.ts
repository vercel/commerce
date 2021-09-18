const getAllProductsQuery = /* GraphQL */ `
  query getAllProducts($first: Int = 250) {
    products(first: $first) {
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      edges {
        node {
          id
          name
          sku
          galleryImages {
            edges {
              node {
                id
                srcSet
                title
                sourceUrl
                mediaItemUrl
                altText
                sizes
              }
            }
          }
          image {
            id
            srcSet
            title
            sourceUrl
            mediaItemUrl
            altText
            sizes
          }
          description
          link
          shortDescription
          slug
          ... on SimpleProduct {
            id
            name
            price
            content
            uri
            slug
            shortDescription
            regularPrice
            salePrice
          }
        }
      }
    }
  }
`

export default getAllProductsQuery
