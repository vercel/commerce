import { pageContentFragment } from '../fragments/page';

export const getPageQuery = /* GraphQL */ `
  query getPage($entityId: Int!) {
    site {
      content {
        page(entityId: $entityId) {
          ...pageContent
          ... on NormalPage {
            plainTextSummary(characterLimit: 100)
            htmlBody
            path
          }
          ... on ContactPage {
            plainTextSummary(characterLimit: 100)
            htmlBody
            path
          }
          ... on BlogIndexPage {
            path
          }
          ... on RawHtmlPage {
            plainTextSummary(characterLimit: 100)
            htmlBody
            path
          }
        }
      }
    }
  }
  ${pageContentFragment}
`;

export const getPagesQuery = /* GraphQL */ `
  query getPages {
    site {
      content {
        pages {
          edges {
            node {
              ...pageContent
              ... on NormalPage {
                plainTextSummary(characterLimit: 100)
                htmlBody
                path
              }
              ... on ContactPage {
                plainTextSummary(characterLimit: 100)
                htmlBody
                path
              }
              ... on BlogIndexPage {
                path
              }
              ... on RawHtmlPage {
                plainTextSummary(characterLimit: 100)
                htmlBody
                path
              }
            }
          }
        }
      }
    }
  }
  ${pageContentFragment}
`;
