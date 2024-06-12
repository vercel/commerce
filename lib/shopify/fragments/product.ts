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
          estimatedDelivery: metafield(namespace: "custom", key: "delivery") {
            value
          }
          mileage: metafield(namespace: "custom", key: "mileage") {
            value
          }
          condition: metafield(namespace: "custom", key: "condition") {
            value
          }
        }
      }
    }
    featuredImage {
      ...image
    }
    engineCylinders: metafield(namespace: "custom", key: "engine_cylinders") {
      value
    }
    fuelType: metafield(namespace: "custom", key: "fuel") {
      value
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
