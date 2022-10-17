const getProductQuery = /* GraphQL */ `
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
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            id
            title
            sku
            availableForSale
            requiresShipping
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
      }
      images(first: 250) {
        pageInfo {
          hasNextPage
          hasPreviousPage
        }
        edges {
          node {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`

export default getProductQuery
