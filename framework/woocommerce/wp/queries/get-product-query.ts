const getProductQuery = /* GraphQL */ `
  query getProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
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
`

export default getProductQuery
