import seoFragment from '../fragments/seo';

export const getPageQuery = /* GraphQL */ `
  query getPage($handle: String!) {
    pageByHandle(handle: $handle) {
      id
      ... on Page {
        title
        handle
        body
        bodySummary
        seo {
          ...seo
        }
        createdAt
        updatedAt
      }
    }
  }
  ${seoFragment}
`;
