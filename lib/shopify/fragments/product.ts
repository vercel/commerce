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
    collections(first: 1) {
      nodes {
        title
        handle
      }
    }
    variants(first: 250) {
      edges {
        node {
          id
          title
          availableForSale
          barcode
          sku
          selectedOptions {
            name
            value
          }
          price {
            amount
            currencyCode
          }
          coreCharge: metafield(namespace: "custom", key: "core_charge") {
            value
          }
          waiverAvailable: metafield(namespace: "custom", key: "waiver_available") {
            value
          }
          coreVariantId: metafield(namespace: "custom", key: "coreVariant") {
            value
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
    productType: metafield(namespace: "custom", key: "product_type") {
      value
    }
  }
  ${imageFragment}
  ${seoFragment}
`;

export default productFragment;
