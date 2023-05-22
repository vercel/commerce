export const pageContentFragment = /* GraphQL */ `
  fragment pageContent on WebPage {
    __typename
    entityId
    name
    seo {
      metaKeywords
      metaDescription
      pageTitle
    }
  }
`;
