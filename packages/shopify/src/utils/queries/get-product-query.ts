export const getProductQuery = /* GraphQL */ `
  query getProductBySlug($slug: String!, $withCustomFields: Boolean = false) {
    productByHandle(handle: $slug) {
      id
      handle
      availableForSale
      title
      productType
      vendor
      description
      descriptionHtml
      options {
        id
        name
        values
      }
      seo {
        description
        title
      }
      variants(first: 100) {
        nodes {
          id
          title
          sku
          availableForSale
          requiresShipping
          image {
            id
            altText
            url
            width
            height
          }
          selectedOptions {
            name
            value
          }
          priceV2 {
            amount
            currencyCode
          }
          compareAtPriceV2 {
            amount
            currencyCode
          }
        }
      }
      metafields(first: 25) @include(if: $withCustomFields) {
        nodes {
          key
          value
          namespace
          description
          type
        }
      }
      images(first: 25) {
        nodes {
          url
          altText
          width
          height
        }
      }
    }
  }
`
