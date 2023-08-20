import seoFragment from '../fragments/seo';

const blogFragment = /* GraphQL */ `
  fragment blog on Blog {
    ... on Blog {
      id
      title
      handle
      articles(first: $articles) {
        edges {
          node {
            id
            title
            handle
            excerpt
            content
            contentHtml
            image {
              url
              altText
              width
              height
            }
            seo {
              ...seo
            }
            publishedAt
          }
        }
      }
      seo {
        ...seo
      }
    }
  }
  ${seoFragment}
`;

export const getBlogQuery = /* GraphQL */ `
  query getBlog($handle: String!, $articles: Int, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    blogByHandle(handle: $handle) {
      ...blog
    }
  }
  ${blogFragment}
`;

export const getBlogsQuery = /* GraphQL */ `
  query getBlogs($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    blogs(first: 100) {
      edges {
        node {
          ...blog
        }
      }
    }
  }
  ${blogFragment}
`;
