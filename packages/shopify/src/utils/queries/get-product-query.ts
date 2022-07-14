export const getProductQuery = /* GraphQL */ `
  query getProductBySlug($slug: String!) {
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
      images(first: 15) {
        nodes {
          url
          altText
          width
          height
        }
      }
    }
    shop {
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`
