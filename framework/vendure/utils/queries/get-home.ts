export const getHomeQuery = /* GraphQL */ `
query home{
    home{
      bannerLeftTitle
      videoTitle
      videoLink
      videoLogo{
        preview
      }
    }
  }
`