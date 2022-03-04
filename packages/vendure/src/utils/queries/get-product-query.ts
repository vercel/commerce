export const getProductQuery = /* GraphQL */ `
  query getProduct($slug: String!) {
    product(slug: $slug) {
      id
      name
      slug
      description
      assets {
        id
        preview
        name
      }
      variants {
        id
        priceWithTax
        currencyCode
        options {
          id
          name
          code
          groupId
          group {
            id
            options {
              name
            }
          }
        }
      }
      optionGroups {
        id
        code
        name
        options {
          id
          name
        }
      }
    }
  }
`
