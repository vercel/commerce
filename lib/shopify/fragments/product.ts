import imageFragment from './image';
import seoFragment from './seo';

const productFragment = /* GraphQL */ `
  fragment product on Product {
    id
    handle
    availableForSale
    title
    description
    descriptionHtml
    summary: metafield(namespace: "custom", key: "product_summary") {
      value
    }
    options {
      id
      name
      values
    }
    priceRange {
      maxVariantPrice {
        amount
        currencyCode
      }
      minVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 250) {
      nodes {
        id
      }
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          image {
            ...image
          }
          price {
            amount
            currencyCode
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    images(first: 20) {
      edges {
        node {
          ...image
        }
      }
    }
    seo {
      ...seo
    }
    tags
    updatedAt
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
