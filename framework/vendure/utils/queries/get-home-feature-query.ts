export const getHomeFeatureQuery = /* GraphQL */ `
query homeFeatures($options:FeatureListOptions){
    features(options:$options){
      items{
         id
        content
        order
        asset{
          preview
        }
        translations{
          id
          languageCode
          content
        }
      }
    }
  }
`
