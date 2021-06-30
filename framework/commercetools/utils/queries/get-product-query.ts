const getProductQuery =
  /* GraphQL */
  `
    query getProductQuery($id: String!, $locale: Locale) {
      product(id: $id) {
        id
        masterData {
          current {
            name(locale: $locale)
            metaDescription(locale: $locale)
            slug(locale: $locale)
            masterVariant {
              prices {
                value {
                  centAmount
                  currencyCode
                }
              }
              sku
              images {
                url
              }
            }
          }
        }
      }
    }
  `

export default getProductQuery
