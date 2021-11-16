export const getBannersByPageQuery = /* GraphQL */ `
query bannersByPage($page: PageName!, $options: BannerListOptions) {
  bannersByPage(page: $page, options: $options) {
    totalItems
    items {
      id
      page
      title
      subtitle
      buttonLabel
      buttonLink
      backgroundColor
      order
      img {
        preview
      }
      languageCode
    }
  }
}
`
