export const getHomeQuery = /* GraphQL */ `
query home{
    home{
      bannerLeftTitle
      bannerLeftImg{
        preview
      }
      videoTitle
      videoLink
      videoLogo{
        preview
      }
    }
  }
`