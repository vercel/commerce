export const ProductOneBySlug = /* GraphQL */ `
  query ProductOneBySlug($slug: String!, $channel: String = "default-channel") {
    product(slug: $slug, channel: $channel) {
      id
      slug
      name
      description
      pricing {
        priceRange {
          start {
            net {
              amount
            }
          }
        }
      }
      variants {
        id
        name
        attributes {
          attribute {
            name
          }
          values {
            name
          }
        }
        pricing {
          price {
            net {
              amount
              currency
            }
          }
        }
      }
      media {
        url
        alt
      }
    }
  }
`
