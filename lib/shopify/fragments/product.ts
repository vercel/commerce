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
      key
      value
      type
    }
    galleryIntro: metafield(namespace: "custom", key: "product_gallery_intro") {
      key
      value
      type
    }
    lower: metafield(namespace: "custom", key: "product_lower_text") {
      key
      value
      type
    }
    notes: metafield(namespace: "custom", key: "tasting_notes_text") {
      key
      value
      type
    }
    notesImage: metafield(namespace: "custom", key: "tasting_notes_image") {
      key
      value
      type
      reference {
        ... on MediaImage {
          id
          image {
            ...image
          }
        }
      }
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
