export const getAllCategoriesAndBrandsQuery = /* GraphQL */ `
  query getCategoriesAndBrands {
    categories {
      results {
        id
        name(locale: "en")
        slug(locale: "en")
      }
    }
    productTypes {
      results {
        attributeDefinitions(includeNames: "designer") {
          results {
            type {
              ... on EnumAttributeDefinitionType {
                values {
                  results {
                    key
                    label
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
