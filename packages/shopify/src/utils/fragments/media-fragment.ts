export const mediaFragment = /* GraphQL */ `
  fragment Media on Media {
    mediaContentType
    alt
    previewImage {
      url
    }
    ... on MediaImage {
      id
      image {
        url
        width
        height
      }
    }
    # ... on Video {
    #   id
    #   sources {
    #     mimeType
    #     url
    #   }
    # }
    # ... on Model3d {
    #   id
    #   sources {
    #     mimeType
    #     url
    #   }
    # }
    # ... on ExternalVideo {
    #   id
    #   embedUrl
    #   host
    # }
  }
`
