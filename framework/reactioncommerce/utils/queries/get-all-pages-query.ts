export const getAllPagesQuery = /* GraphQL */ `
  query getAllPages($shopId: ID!, $language: String! = "en") {
    shop(id: $shopId) {
      defaultNavigationTree(language: $language) {
        items {
          navigationItem {
            _id
            data {
              contentForLanguage
              classNames
              url
              isUrlRelative
              shouldOpenInNewWindow
            }
          }
        }
      }
    }
  }
`
export default getAllPagesQuery
